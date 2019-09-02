import { readFile, exists } from "../utils/fs";
import matter from "gray-matter";

interface ILink {
  url: string;
  title: string;
}

async function links(): Promise<ILink[]> {
  if (await exists("./links.yml")) {
    const fileContent = await readFile("./links.yml", "utf8");
    const { data } = matter(fileContent);
    return Array.from({ ...data, length: data.length });
  }
  return [];
}

export { links, ILink };
