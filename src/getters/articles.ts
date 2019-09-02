import glob from "fast-glob";
import { readFile } from "../utils/fs";
import { readMeta, IFile, IFrontMatterFile } from "../utils/read-meta";
import { parsePath, parseRepositoryPath } from "../utils/parse-path";
import { IContent, ContentType } from "../definitions";
import { IConfig } from "./config";

interface ITranslatedTo {
  lang: string;
  path: string;
}

interface IArticle extends IContent {
  type: ContentType.Article;
  next?: {
    title: string;
    description?: string;
    path: string;
  };
  published?: boolean;
  tags?: string[];
  toc?: boolean;
  translated_to?: ITranslatedTo[];
  translated_from?: {
    lang: string;
    title: string;
    path: string;
  };
}

type ArticlesMap = {
  [path: string]: IArticle;
};

interface IArticles {
  order: string[];
  byPath: ArticlesMap;
}

/**
 * Read the content a file based on their path and return the path and the content.
 * @param path The path to the article in the FS
 */
async function toContent(path: string): Promise<IFile> {
  return {
    content: await readFile(path, "utf8"),
    ...parsePath(path)
  };
}

/**
 * Read the metadata from the content of a file and get a valid article
 * @param file A file with their content and path
 */
function toArticle(config: IConfig) {
  return async function(file: IFile): Promise<IArticle> {
    const {
      data,
      content,
      path,
      tmpPath,
      filePath
    }: IFrontMatterFile = await readMeta(file);

    return {
      ...data,
      type: ContentType.Article,
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
 * Accumulate an article inside a map of articles
 * @param articles The accumulated map of articles
 * @param article The current article
 */
function toMap(articles: ArticlesMap, article: IArticle): ArticlesMap {
  return {
    ...articles,
    [article.path]: article
  };
}

/**
 * Substract the date of the second article to the date of the first one
 * @param articleA The first article
 * @param articleB The second article
 */
function byDate(articleA: IArticle, articleB: IArticle): number {
  if (articleA.date && articleB.date) {
    return articleB.date.getTime() - articleA.date.getTime();
  }
  return 0;
}

/**
 * Get the path of an article
 * @param article The article to parse
 */
function toPath(article: IArticle): string {
  return article.path;
}

function onlyPublished(article: IArticle): boolean {
  return !!article.published;
}

async function articles(config: IConfig): Promise<IArticles> {
  const paths = await glob("./articles/**/*.mdx");
  const files = await Promise.all(paths.map(toContent));
  const articles = await Promise.all(files.map(toArticle(config)));
  return {
    byPath: articles.reduce(toMap, {}),
    order: articles
      .filter(onlyPublished)
      .sort(byDate)
      .map(toPath)
  };
}

export { articles, IArticles, IArticle };
