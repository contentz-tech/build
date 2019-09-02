import { jsx } from "@emotion/core";

import { render } from "../utils/render";
import { IState } from "../state";
import { check } from "../utils/cache";
import { writeFile, makeDir } from "../utils/fs";

import LinksPage from "../components/links";
import Document from "../components/document";
import { resolve } from "path";

async function builder(state: IState) {
  if (
    (await check("config.yml", state.config)) &&
    (await check("links.yml", JSON.stringify(state.links)))
  ) {
    return;
  }

  const html = await render(
    <Document path="links.mdx">
      <LinksPage />
    </Document>,
    { state }
  );
  await makeDir(resolve("public/links"));
  await writeFile(
    resolve("public/links/index.html"),
    `<!DOCTYPE html>${html}`,
    "utf8"
  );
}

export { builder };
