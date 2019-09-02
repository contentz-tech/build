import matter from "gray-matter";
import { IPath } from "./parse-path";

interface IFile extends IPath {
  content: string;
}

interface IFrontMatterFile extends IPath {
  data: object;
  content: string;
}

function readMeta(file: IFile): IFrontMatterFile {
  const extracted = matter(file.content);
  const data = Object.assign(
    extracted.data,
    { title: extracted.data.title },
    { toc: extracted.data.toc || false },
    {
      date: !extracted.data.date
        ? new Date()
        : !(extracted.data.date instanceof Date)
        ? new Date(extracted.data.date)
        : extracted.data.date
    },
    extracted.data.tags && typeof extracted.data.tags === "string"
      ? {
          tags: extracted.data.tags.split(/,\s?/)
        }
      : {}
  );
  return {
    data,
    content: extracted.content,
    path: file.path,
    tmpPath: file.tmpPath,
    filePath: file.filePath
  };
}

export { readMeta, IFile, IFrontMatterFile };
