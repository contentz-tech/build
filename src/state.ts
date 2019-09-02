import { IConfig, config as getConfig } from "./getters/config";
import { articles, IArticles } from "./getters/articles";
import { pages, IPages } from "./getters/pages";
import { slides, ISlides } from "./getters/slides";
import { links, ILink } from "./getters/links";
import { statics } from "./getters/statics";
import { i18n } from "./getters/i18n";

interface IState {
  config: IConfig;
  articles: IArticles;
  pages: IPages;
  slides: ISlides;
  links: ILink[];
  statics: string[];
  i18n: any;
}

async function getState(): Promise<IState> {
  const config: IConfig = await getConfig();
  return {
    config,
    articles: await articles(config),
    pages: await pages(config),
    slides: await slides(config),
    links: await links(),
    statics: await statics(),
    i18n: await i18n(config)
  };
}

export { getState, IState };
