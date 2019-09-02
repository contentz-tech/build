import { check } from "../utils/cache";
import { writeFile, del } from "../utils/fs";
import { IState } from "../state";
import { IArticle } from "../getters/articles";
import { IPage } from "../getters/pages";
import { ISlide } from "../getters/slides";

const path: string = "./public/sitemap.xml";

/**
 * Check if all articles, pages and slides are already cached
 * @param state Current state of the project
 */
async function checkCache(state: IState): Promise<boolean> {
  if (!state.config.incremental) return false;
  const caches = await Promise.all(
    [
      ...state.articles.order.map(
        (path: string) => state.articles.byPath[path]
      ),
      ...state.pages.order.map((path: string) => state.pages.byPath[path]),
      ...state.slides.order.map((path: string) => state.slides.byPath[path])
    ]
      .map((resource: IArticle | IPage | ISlide) => ({
        path: resource.path,
        content: resource.content
      }))
      .map(({ path, content }) => check(path, content))
  );
  return caches.reduce((prev, next) => next === prev, true);
}

function calculatePriority(path: string): number {
  return (
    (100 - path.split("/").filter(section => section !== "").length * 15) / 100
  );
}

async function builder(state: IState) {
  if ((await checkCache(state)) && (await check("config.yml", state.config))) {
    return;
  }
  if (!state.config.domain) return await del(path);

  const urls = state.articles.order
    .concat(state.pages.order)
    .concat(state.slides.order)
    .map((path: string) => {
      return { path, priority: calculatePriority(path) };
    })
    .concat([
      { path: "/", priority: 1 },
      { path: "/articles/", priority: 0.9 },
      state.links.length > 0
        ? { path: "/links/", priority: 0.9 }
        : { path: "", priority: 0 }
    ])
    .filter(route => route.path !== "" || route.priority !== 0)
    .sort((routeA, routeB) => routeB.priority - routeA.priority)
    .map(
      route => `  <url>
    <loc>${state.config.domain}${route.path}</loc>
    <lastmod>${new Date().toJSON()}</lastmod>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${urls}
</urlset>`;
  await writeFile(path, sitemap, "utf8");
}

export { builder };
