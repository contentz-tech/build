import { jsx } from "@emotion/core";

import { render } from "../utils/render";
import { IState } from "../state";
import { check } from "../utils/cache";
import { writeFile } from "../utils/fs";

import ErrorPage from "../components/error";
import Document from "../components/document";

async function builder(state: IState) {
  if (await check("config.yml", state.config)) return;
  const html = await render(
    <Document path="/error.mdx">
      <ErrorPage />
    </Document>,
    { state }
  );
  await writeFile("public/404.html", `<!DOCTYPE html>${html}`, "utf8");
}

export { builder };
