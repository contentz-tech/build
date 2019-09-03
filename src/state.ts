import { articles, IArticles } from "./getters/articles";
import { IConfig, config as getConfig } from "./getters/config";
import { i18n } from "./getters/i18n";
import { links, ILink } from "./getters/links";
import { pages, IPages } from "./getters/pages";
import { resume, IResume } from "./getters/resume";
import { slides, ISlides } from "./getters/slides";
import { statics } from "./getters/statics";

interface IState {
  articles: IArticles;
  config: IConfig;
  i18n: any;
  links: ILink[];
  pages: IPages;
  resume?: IResume;
  slides: ISlides;
  statics: string[];
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
    i18n: await i18n(config),
    resume: await resume(),
  };
}

export { getState, IState };
