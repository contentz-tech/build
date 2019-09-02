import { writeFile } from "../utils/fs";
import { check } from "../utils/cache";
import { IState } from "../state";
import { IArticle } from "../getters/articles";

const path: string = "./public/atom.xml";

/**
 * Check if all articles are already cached
 * @param state Current state of the project
 */
async function checkCache(state: IState): Promise<boolean> {
  if (!state.config.incremental) return false;
  const caches = await Promise.all(
    state.articles.order
      .map((path: string) => state.articles.byPath[path])
      .map((article: IArticle) => ({
        path: article.path,
        content: article.content
      }))
      .map(({ path, content }) => check(path, content))
  );
  return caches.reduce((prev, next) => next === prev, true);
}

async function builder(state: IState) {
  if ((await checkCache(state)) && (await check("config.yml", state.config))) {
    return;
  }
  if (!state.config.domain) return;

  const rss = state.articles.order
    .map((path: string): IArticle => state.articles.byPath[path])
    .map((article: IArticle): string => {
      const link = state.config.domain + article.path;
      return `
      <entry>
        <id>${article.title}</id>
        <title>${article.title}</title>
        <link href="${link}"/>
        ${article.date ? `<updated>${article.date.toJSON()}</updated>` : ""}
        <content type="xhtml">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${article.description ? `<p>${article.description}</p>` : ""}
            <a href="${link}">Read Article</a>
          </div>
        </content>
        <author>
          ${state.config.title ? `<name>${state.config.title}</name>` : ""}
          ${state.config.email ? `<email>${state.config.email}</email>` : ""}
        </author>
      </entry>`;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    ${
      state.config.title
        ? `<title>${state.config.title} - Articles</title>`
        : "<title>My Articles</title>"
    }
    <link href="${state.config.domain}" rel="self"/>
    <link href="${state.config.domain}"/>
    <updated>${Date.now()}</updated>
    <id>${state.config.domain}</id>
    <author>
      ${state.config.title ? `<name>${state.config.title}</name>` : ""}
      ${state.config.email ? `<email>${state.config.email}</email>` : ""}
    </author>${rss}
  </feed>`;

  return await writeFile(path, feed, "utf8");
}

export { builder };
