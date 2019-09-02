import { writeFile, del } from "../utils/fs";
import { join } from "path";
import { IState } from "../state";
import { IArticle } from "../getters/articles";
import { ISlide } from "../getters/slides";
import { check } from "../utils/cache";

const path: string = "./public/robots.txt";

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
      ...state.slides.order.map((path: string) => state.slides.byPath[path])
    ]
      .map((resource: IArticle | ISlide) => ({
        path: resource.path,
        content: resource.content
      }))
      .map(({ path, content }) => check(path, content))
  );
  return caches.reduce((prev, next) => next === prev, true);
}

async function builder(state: IState) {
  if ((await checkCache(state)) && (await check("config.yml", state.config))) {
    return;
  }
  if (!state.config.domain) return await del(path);

  const disallowed = [
    ...Object.values(state.articles.byPath),
    ...Object.values(state.slides.byPath)
  ]
    .filter((resource: IArticle | ISlide) => !!resource.published !== true)
    .map(
      resource => `Disallow: ${join(state.config.domain || "", resource.path)}`
    )
    .concat([
      `Disallow: ${join(state.config.domain, "404.html")}`,
      `Disallow: ${join(state.config.domain, "load-sw.js")}`,
      state.config.analytics
        ? `Disallow: ${join(state.config.domain, "load-analytics.js")}`
        : ""
    ])
    .filter(Boolean);

  const content = ["User-agent: *"]
    .concat(disallowed)
    .concat(`Sitemap: ${join(state.config.domain, "sitemap.xml")}`)
    .join("\n");

  await writeFile(path, content, "utf8");
}

export { builder };
