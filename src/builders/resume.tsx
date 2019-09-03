import { jsx } from "@emotion/core";

import { render } from "../utils/render";
import { IState } from "../state";
import { check } from "../utils/cache";
import { writeFile, makeDir } from "../utils/fs";

import ResumePage from "../components/resume";
import Document from "../components/document";

async function builder(state: IState) {
  if (!state.resume) return;
  if (
    (await check("config.yml", state.config)) &&
    (await check("resume.json", JSON.stringify(state.resume)))
  ) {
    return;
  }
  const html = await render(
    <Document path="cv.mdx">
      <ResumePage />
    </Document>,
    { state }
  );
  await makeDir("public/cv");
  await writeFile("public/cv/index.html", `<!DOCTYPE html>${html}`, "utf8");
}

export { builder };
