import chalk from "chalk";
import en from "../messages/en.json";
import es from "../messages/en.json";
import languages from "../data/languages.json";
import { IConfig } from "./config.js";

async function i18n(config: IConfig): Promise<object> {
  const language = config.language;
  switch (language) {
    case "es": {
      return { ...es, languages };
    }
    case "en": {
      return { ...en, languages };
    }
    default: {
      console.warn(
        chalk.yellowBright(
          `Language ${language} not supported, falling back to English, do you want to add support for it?`
        )
      );
      console.warn(
        chalk.yellowBright(
          "Add it on https://github.com/contentz-tech/build/tree/master/src/messages and https://github.com/contentz-tech/build/blob/master/src/getters/i18n.js"
        )
      );
      return { ...en, languages };
    }
  }
}

export { i18n };
