import { minify } from "terser";
import { writeFile, del } from "../utils/fs";
import { IState } from "../state";
import { check } from "../utils/cache";

const path: string = "./public/load-analytics.js";

async function builder(state: IState) {
  if (await check("config.yml", state.config)) return;

  if (!state.config.analytics) return await del(path);

  await writeFile(
    path,
    minify(
      [
        "window.dataLayer = window.dataLayer || [];",
        "function gtag(){dataLayer.push(arguments);}",
        'gtag("js", new Date());',
        `gtag("config", "${state.config.analytics}");`
      ].join("")
    ).code
  );
}

export { builder };
