import { getState, IState } from "./state";
import { build } from "./build";
import chalk from "chalk";
import termSize from "term-size";
import clear from "clear";

function logState(state: IState): string {
  return `  Articles ${chalk.bold.cyan(
    Object.keys(state.articles.byPath).length.toString()
  )} / ${chalk.bold.green(state.articles.order.length.toString())} Published
  Slides ${chalk.bold.cyan(
    Object.keys(state.slides.byPath).length.toString()
  )} / ${chalk.bold.green(state.slides.order.length.toString())} Published
  Pages ${chalk.bold.cyan(state.pages.order.length.toString())}
  Links ${chalk.bold.cyan(state.links.length.toString())}
  Statics ${chalk.bold.cyan(state.statics.length.toString())}
`;
}

async function main() {
  try {
    clear();
    console.log("");
    console.log(chalk.bold.green("Contentz\n"));
    console.log(
      chalk.bold.green("📋 Reading project state from file system.\n")
    );
    const state: IState = await getState();
    console.log(logState(state));
    console.log(chalk.bold.green("⚡️ Building an optimized website.\n"));
    await build(state);
    console.log(
      chalk.bold.green("✅ Website built, try it with `npx serve public`.\n")
    );
  } catch (error) {
    console.error("=".repeat(termSize().columns) + "\n");
    console.error(chalk.red(error.stack));
    console.error("\n" + "=".repeat(termSize().columns) + "\n");
    process.exit(1);
  }
}

export = main;
