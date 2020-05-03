import { jsx } from "@emotion/core";
// import getTOC from "markdown-toc";

import { render } from "../utils/render";
import { IState } from "../state";
import { check } from "../utils/cache";
import { writeFile, makeDir } from "../utils/fs";
import { parseMDX } from "../utils/parse-mdx";

import LayoutPage from "../components/layout";
import Document from "../components/document";
import { IPage } from "../getters/pages";
import { loadModule } from "../utils/load-module";
import { resolve, parse, join } from "path";

/**
 * Check if all pages are already cached
 * @param state Current state of the project
 */
async function checkCache(state: IState): Promise<boolean> {
  if (!state.config.incremental) return false;
  const caches = await Promise.all(
    Object.values(state.pages.byPath)
      .map((resource: IPage) => ({
        path: resource.path,
        content: resource.content
      }))
      .map(({ path, content }) => check(path, content))
  );
  return caches.reduce((prev, next) => next === prev, true);
}

function pageBuilder(state: IState) {
  return async (page: IPage) => {
    if (await check(page.path, page)) return;
    const [content] = await Promise.all([
      parseMDX(page.content)
      // article.toc
      //   ? parseMDX(getTOC(article.content).content)
      //   : Promise.resolve(null)
    ]);
    await makeDir(resolve(parse(page.tmpPath).dir));
    await Promise.all([
      writeFile(resolve(page.tmpPath), content.code, "utf8")
      // toc
      //   ? writeFile(article.tmpPath.concat(".toc.js"), toc.code, "utf8")
      //   : Promise.resolve(null)
    ]);
    const Component = loadModule(page.tmpPath);
    // const TOC = (article.toc
    // ? loadModule(article.tmpPath.concat(".toc.js"))
    // : Promise.resolve(null));
    const renderedContent: string = await render(
      <LayoutPage data={page} Component={Component} />,
      { state }
    );
    const html: string = await render(
      <Document data={page} path={join("/pages", page.path)} content={renderedContent} />,
      { state }
    );
    await makeDir(resolve(join("./public", page.path)));
    await writeFile(
      resolve(join("./public", page.path, "index.html")),
      `<!DOCTYPE html>${html}`,
      "utf8"
    );
  };
}

async function builder(state: IState) {
  if ((await checkCache(state)) && (await check("config.yml", state.config))) {
    return;
  }

  await Promise.all(
    Object.values(state.pages.byPath).map(pageBuilder(state))
  );
}

export { builder };
