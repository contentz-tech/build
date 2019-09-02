import glob from "fast-glob";
import { readFile } from "../utils/fs";
import { readMeta, IFile, IFrontMatterFile } from "../utils/read-meta";
import { parsePath, parseRepositoryPath } from "../utils/parse-path";
import { IContent, ContentType } from "../definitions";
import { IConfig } from "./config";

interface ISlide extends IContent {
  type: ContentType.Slide;
  published?: boolean;
}

type SlidesMap = {
  [path: string]: ISlide;
};

interface ISlides {
  order: string[];
  byPath: SlidesMap;
}

/**
 * Read the content a file based on their path and return the path and the content.
 * @param path The path to the page in the FS
 */
async function toContent(path: string): Promise<IFile> {
  return {
    content: await readFile(path, "utf8"),
    ...parsePath(path, { isSlide: true })
  };
}

/**
 * Read the metadata from the content of a file and get a valid page
 * @param file A file with their content and path
 */
function toSlides(config: IConfig) {
  return async function toSlides(file: IFile): Promise<ISlide> {
    const {
      data,
      content,
      path,
      tmpPath,
      filePath
    }: IFrontMatterFile = await readMeta(file);
    return {
      ...data,
      type: ContentType.Slide,
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
 * Accumulate an slide inside a map of slides
 * @param slides The accumulated map of slides
 * @param slide The current slide
 */
function toMap(slides: SlidesMap, slide: ISlide): SlidesMap {
  return {
    ...slides,
    [slide.path]: slide
  };
}

/**
 * Substract the date of the second slide to the date of the first one
 * @param slideA The first slide
 * @param slideB The second slide
 */
function byDate(slideA: ISlide, slideB: ISlide): number {
  if (slideA.date && slideB.date) {
    return slideB.date.getTime() - slideA.date.getTime();
  }
  return 0;
}

/**
 * Get the path of an slide
 * @param slide The slide to parse
 */
function toPath(slide: ISlide): string {
  return slide.path;
}

function onlyPublished(article: ISlide): boolean {
  return !!article.published;
}

async function slides(config: IConfig): Promise<ISlides> {
  const paths = await glob("./slides/**/*.mdx");
  const files = await Promise.all(paths.map(toContent));
  const slides = await Promise.all(files.map(toSlides(config)));
  return {
    byPath: slides.reduce(toMap, {}),
    order: slides
      .filter(onlyPublished)
      .sort(byDate)
      .map(toPath)
  };
}

export { slides, ISlides, ISlide };
