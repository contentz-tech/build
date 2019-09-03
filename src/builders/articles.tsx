import { jsx } from "@emotion/core";
// import getTOC from "markdown-toc";

import { render } from "../utils/render";
import { IState } from "../state";
import { check } from "../utils/cache";
import { writeFile, makeDir, del } from "../utils/fs";
import { parseMDX } from "../utils/parse-mdx";

import LayoutPage from "../components/layout";
import Document from "../components/document";
import Archive from "../components/archive";
import { IArticle } from "../getters/articles";
import { loadModule } from "../utils/load-module";
import { resolve, parse, join } from "path";

/**
 * Check if all articles are already cached
 * @param state Current state of the project
 */
async function checkCache(state: IState): Promise<boolean> {
  if (!state.config.incremental) return false;
  const caches = await Promise.all(
    Object.values(state.articles.byPath)
      .map((resource: IArticle) => ({
        path: resource.path,
        content: resource.content
      }))
      .map(({ path, content }) => check(path, content))
  );
  return caches.reduce((prev, next) => next === prev, true);
}

function articleBuilder(state: IState) {
  return async (article: IArticle) => {
    if (await check(article.path, article)) return;
    const [content] = await Promise.all([
      parseMDX(article.content)
      // article.toc
      //   ? parseMDX(getTOC(article.content).content)
      //   : Promise.resolve(null)
    ]);
    await makeDir(resolve(parse(article.tmpPath).dir));
    await Promise.all([
      writeFile(resolve(article.tmpPath), content.code, "utf8")
      // toc
      //   ? writeFile(article.tmpPath.concat(".toc.js"), toc.code, "utf8")
      //   : Promise.resolve(null)
    ]);
    const Component = loadModule(article.tmpPath);
    // const TOC = (article.toc
    // ? loadModule(article.tmpPath.concat(".toc.js"))
    // : Promise.resolve(null));
    const renderedContent: string = await render(
      <LayoutPage data={article} Component={Component} />,
      { state }
    );
    const html: string = await render(
      <Document data={article} path={article.path} content={renderedContent} />,
      { state }
    );
    await makeDir(resolve(join("./public", article.path)));
    await writeFile(
      resolve(join("./public", article.path, "index.html")),
      `<!DOCTYPE html>${html}`,
      "utf8"
    );
  };
}

async function archiveBuilder(state: IState) {
  if (state.articles.order.length === 0) {
    return await del("public/articles/index.html");
  }
  const html = await render(
    <Document path="archive.mdx">
      <Archive />
    </Document>,
    { state }
  );
  await makeDir(resolve("./public/articles"));
  await writeFile(
    resolve("./public/articles/index.html"),
    `<!DOCTYPE html>${html}`,
    "utf8"
  );
}

async function builder(state: IState) {
  if ((await checkCache(state)) && (await check("config.yml", state.config))) {
    return;
  }

  await Promise.all(
    Object.values(state.articles.byPath)
      .map(articleBuilder(state))
      .concat(archiveBuilder(state))
  );
}

export { builder };
