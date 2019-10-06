import { jsx } from "@emotion/core";
import { render } from "../utils/render";
import { IState } from "../state";
import { check } from "../utils/cache";
import { writeFile, makeDir, del } from "../utils/fs";
import { parseMDX } from "../utils/parse-mdx";
import SlidePage from "../components/slide";
import Document from "../components/document";
import SlidesPage from "../components/slides";
import { loadModule } from "../utils/load-module";
import { resolve, join } from "path";
import { ISlide } from "../getters/slides";
import { minify } from "terser";
import { BabelFileResult } from "babel-core";

/**
 * Check if all slides are already cached
 * @param state Current state of the project
 */
async function checkCache(state: IState): Promise<boolean> {
  if (!state.config.incremental) return false;
  const caches = await Promise.all(
    Object.values(state.slides.byPath)
      .map(resource => ({
        path: resource.path,
        content: resource.content
      }))
      .map(({ path, content }) => check(path, content))
  );
  return caches.reduce((prev, next) => next === prev, true);
}

async function slideScriptBuilder(state: IState) {
  if (state.slides.order.length === 0) {
    return await del("public/slide.js");
  }

  await writeFile(
    "./public/slide.js",
    minify(
      [
        "const totalSlides = parseInt(",
        '  document.getElementById("slide").dataset.total,',
        "  10",
        ");",
        "function next(pathname) {",
        '  if (pathname.endsWith("/")) return pathname + 1',
        '  const number = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1), 10) + 1;',
        "  if (number > totalSlides) return;",
        '  return pathname.slice(0, pathname.lastIndexOf("/") + 1) + number;',
        "}",
        "function prev(pathname) {",
        '  if (pathname.endsWith("/")) return;',
        '  const number = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1), 10) - 1;',
        '  return pathname.slice(0, pathname.lastIndexOf("/") + 1) + (number === 0 ? "" : number);',
        "}",
        'const canUsePortal = "HTMLPortalElement" in window ? true : false;',
        'let nextPortal;',
        'const nextNumber = next(window.location.pathname) && next(window.location.pathname).slice(-1);',
        'const prevNumber = prev(window.location.pathname) && prev(window.location.pathname).slice(-1);',
        'if (canUsePortal && nextNumber <= totalSlides) {',
        '  nextPortal = document.createElement("portal");',
        '  nextPortal.src = window.location.origin + next(window.location.pathname);',
        '  nextPortal.style = "display: none;"',
        '  document.body.appendChild(nextPortal);',
        '}',
        'window.addEventListener("keydown", ({ key }) => {',
        '  if (key === "ArrowRight") {',
        '    if (canUsePortal) {',
        '      nextPortal.activate();',
        '    } else {',
        '      if (nextNumber === undefined) return;',
        '      window.location.pathname = next(window.location.pathname);',
        '    }',
        '  }',
        '  if (key === "ArrowLeft") {',
        '    if (prevNumber === undefined) return;',
        '    window.location.pathname = prev(window.location.pathname);',
        '  }',
        "})"
      ].join("\n")
    ).code
  );
}

function slideBuilder(state: IState) {
  return async (slide: ISlide) => {
    if (await check(slide.path, slide)) return;
    const slides = await Promise.all(slide.content.split("---").map(parseMDX));
    await makeDir(resolve(slide.tmpPath));
    await Promise.all(
      slides.map((content: BabelFileResult, index: number) =>
        writeFile(join(slide.tmpPath, `${index}.js`), content.code, "utf8")
      )
    );
    await Promise.all(
      slides.map(async (_, index) => {
        const Component = loadModule(join(slide.tmpPath, `${index}.js`));
        const html: string = await render(
          <Document data={slide} path={slide.path}>
            <SlidePage Component={Component} totalSlides={slides.length - 1} />
          </Document>,
          { state }
        );
        await makeDir(resolve(join("./public", slide.path)));
        await writeFile(
          resolve(
            join(
              "./public",
              slide.path,
              `${index === 0 ? "index" : index}.html`
            )
          ),
          `<!DOCTYPE html>${html}`,
          "utf8"
        );
      })
    );
  };
}

async function slideListBuilder(state: IState) {
  if (state.slides.order.length === 0) {
    return await del("public/slides/index.html");
  }
  const html = await render(
    <Document path="slides.mdx">
      <SlidesPage />
    </Document>,
    { state }
  );
  await makeDir(resolve("./public/slides"));
  await writeFile(
    resolve("./public/slides/index.html"),
    `<!DOCTYPE html>${html}`,
    "utf8"
  );
}

async function builder(state: IState) {
  if ((await checkCache(state)) && (await check("config.yml", state.config))) {
    return;
  }

  await Promise.all(
    Object.values(state.slides.byPath)
      .map(slideBuilder(state))
      .concat(slideScriptBuilder(state))
      .concat(slideListBuilder(state))
  );
}

export { builder };
