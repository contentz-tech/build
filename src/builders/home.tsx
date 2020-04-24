import { jsx } from "@emotion/core";

import { render } from "../utils/render";
import { IState } from "../state";
import { check } from "../utils/cache";
import { writeFile } from "../utils/fs";

import HomePage from "../components/home";
import Document from "../components/document";

async function builder(state: IState) {
  if (await check("config.yml", state.config)) return;
  const html = await render(
    <Document path="/home.mdx">
      <HomePage />
    </Document>,
    { state }
  );
  await writeFile("public/index.html", `<!DOCTYPE html>${html}`, "utf8");
}

export { builder };
