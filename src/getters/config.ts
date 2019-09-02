import matter from "gray-matter";
import { readFile, exists } from "../utils/fs";

interface ISocial {
  twitter?: string;
  github?: string;
  npm?: string;
  linkedin?: string;
  dev?: string;
  meetup?: number;
}

interface INavigation {
  name: string;
  path: string;
}

interface IConfig {
  title?: string;
  description?: string;
  domain?: string;
  language?: string;
  repository?: string;
  email?: string;
  patreon?: string;
  social?: ISocial;
  navigation?: INavigation[];
  incremental?: boolean;
  icon?: string;
  analytics?: string;
  sw?: boolean
}

function parsePackage(pkgRaw: string): IConfig {
  const pkg: {
    name?: string;
    description?: string;
    repository?: string;
    contentz?: IConfig;
  } = JSON.parse(pkgRaw);

  const result: IConfig = {};
  if (pkg.name) {
    result.title = pkg.name;
  }
  if (pkg.description) {
    result.description = pkg.description;
  }
  if (pkg.repository) {
    result.repository = pkg.repository;
  }
  if (pkg.contentz) {
    Object.assign(result, pkg.contentz);
  }
  return result;
}

async function config(): Promise<IConfig> {
  const config = {
    title: "Just another Contentz site",
    description: "",
    language: "en",
    toc: false,
    incremental: true,
    sw: true
  };

  if (await exists("./package.json")) {
    const pkgRaw = await readFile("./package.json", "utf8");
    Object.assign(config, parsePackage(pkgRaw));
  }

  if (await exists("./config.yml")) {
    Object.assign(config, matter(await readFile("./config.yml", "utf8")).data);
  }

  return config;
}

export { IConfig, config };
