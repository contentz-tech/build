import { sha } from "./sha";
import { IState } from "../state";
import { IArticle } from "../getters/articles";
import { IPage } from "../getters/pages";
import { ISlide } from "../getters/slides";
import { makeDir, writeFile, exists, readFile } from "./fs";

const pkg = require("../../package.json");

type Resource = IArticle | IPage | ISlide | { path: string; content: string };
interface IShaResource {
  path: string;
  sha: string;
}
interface Cache {
  version: string;
  [path: string]: string;
}

async function read(): Promise<Cache> {
  if (await exists("./.cache/files.json")) {
    const rawCache = await readFile("./.cache/files.json", "utf8");
    return JSON.parse(rawCache);
  }
  return { version: pkg.version };
}

async function check(path: string, content: string | object): Promise<boolean> {
  const cache = await read();
  return (
    cache[path] ===
      sha(typeof content === "object" ? JSON.stringify(content) : content) &&
    cache.version === pkg.version
  );
}

async function write(state: IState): Promise<void> {
  await makeDir(".cache");
  const content: Cache = [
    ...Object.values(state.articles.byPath),
    ...Object.values(state.pages.byPath),
    ...Object.values(state.slides.byPath),
    { path: "config.yml", content: JSON.stringify(state.config) },
    { path: "links.yml", content: JSON.stringify(state.links) },
    { path: "static", content: JSON.stringify(state.statics) }
  ]
    .map(
      (resource: Resource): IShaResource => {
        return {
          path: resource.path,
          sha: sha(resource.content)
        };
      }
    )
    .reduce(
      (cache, file: IShaResource): Cache => {
        return {
          ...cache,
          [file.path]: file.sha
        };
      },
      { version: pkg.version }
    );
  await writeFile("./.cache/files.json", JSON.stringify(content));
}

export { write, read, check };
