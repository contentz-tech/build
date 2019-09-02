import { IState } from "./state";
import { makeDir, del } from "./utils/fs";
import { write as writeCache } from "./utils/cache";

// Builders
import { builder as analytics } from "./builders/analytics";
import { builder as articles } from "./builders/articles";
import { builder as error } from "./builders/error";
import { builder as feed } from "./builders/feed";
import { builder as home } from "./builders/home";
import { builder as links } from "./builders/links";
import { builder as pages } from "./builders/pages";
import { builder as robots } from "./builders/robots";
import { builder as sitemap } from "./builders/sitemap";
import { builder as slides } from "./builders/slides";
import { builder as statics } from "./builders/statics";
import { builder as sw } from "./builders/sw";

async function build(state: IState): Promise<void> {
  try {
    if (!state.config.incremental) {
      await Promise.all([del(".cache"), del("public")]);
    }

    await Promise.all([makeDir(".tmp"), makeDir("public")]);

    await Promise.all([
      await Promise.all([
        articles(state),
        error(state),
        home(state),
        links(state),
        pages(state),
        slides(state)
      ]),
      await Promise.all([
        analytics(state),
        feed(state),
        robots(state),
        sitemap(state),
        statics(state),
        sw(state)
      ])
    ]);

    if (state.config.incremental) await writeCache(state);
  } catch (error) {
    await del("public");
    throw error;
  } finally {
    await del(".tmp");
  }
}

export { build };
