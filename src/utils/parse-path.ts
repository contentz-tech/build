import { join } from "path";
import { resolve } from "url";

interface IPath {
  tmpPath: string;
  filePath: string;
  repositoryPath?: string;
  path: string;
}

interface config {
  isSlide?: boolean;
}

function parsePath(path: string, { isSlide = false }: config = {}): IPath {
  return {
    filePath: path,
    tmpPath: isSlide
      ? join("./.tmp", path).replace(".mdx", "/")
      : join("./.tmp", path).replace("mdx", "js"),
    path: join("/", path, "/")
      .replace(".mdx", "")
      .replace("/pages", "")
  };
}

function parseRepositoryPath(repository: string, filePath: string): string {
  return resolve(resolve(repository, "edit/master/"), filePath);
}

export { parsePath, parseRepositoryPath, IPath };
