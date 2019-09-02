import glob from "fast-glob";
import { readFile } from "../utils/fs";
import { readMeta, IFile, IFrontMatterFile } from "../utils/read-meta";
import { parsePath, parseRepositoryPath } from "../utils/parse-path";
import { IContent, ContentType } from "../definitions";
import { IConfig } from "./config";

interface IPage extends IContent {
  type: ContentType.Page;
}

type PagesMap = {
  [path: string]: IPage;
};

interface IPages {
  order: string[];
  byPath: PagesMap;
}

/**
 * Read the content a file based on their path and return the path and the content.
 * @param path The path to the page in the FS
 */
async function toContent(path: string): Promise<IFile> {
  return {
    content: await readFile(path, "utf8"),
    ...parsePath(path)
  };
}

/**
 * Read the metadata from the content of a file and get a valid page
 * @param file A file with their content and path
 */
function toPages(config: IConfig) {
  return async function toPages(file: IFile): Promise<IPage> {
    const {
      data,
      content,
      path,
      tmpPath,
      filePath
    }: IFrontMatterFile = await readMeta(file);

    return {
      ...data,
      type: ContentType.Page,
      content,
      path,
      tmpPath,
      filePath,
      ...(config.repository
        ? { repositoryPath: parseRepositoryPath(config.repository, filePath) }
        : {})
    };
  };
}

/**
 * Accumulate an page inside a map of pages
 * @param pages The accumulated map of pages
 * @param page The current page
 */
function toMap(pages: PagesMap, page: IPage): PagesMap {
  return {
    ...pages,
    [page.path]: page
  };
}

/**
 * Substract the date of the second page to the date of the first one
 * @param pageA The first page
 * @param pageB The second page
 */
function byDate(pageA: IPage, pageB: IPage): number {
  if (pageA.date && pageB.date) {
    return pageB.date.getTime() - pageA.date.getTime();
  }
  return 0;
}

/**
 * Get the path of an page
 * @param page The page to parse
 */
function toPath(page: IPage): string {
  return page.path;
}

async function pages(config: IConfig): Promise<IPages> {
  const paths = await glob("./pages/**/*.mdx");
  const files = await Promise.all(paths.map(toContent));
  const pages = await Promise.all(files.map(toPages(config)));
  return {
    byPath: pages.reduce(toMap, {}),
    order: pages.sort(byDate).map(toPath)
  };
}

export { pages, IPages, IPage };
