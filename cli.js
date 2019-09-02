#!/usr/bin/env node
const meow = require("meow");
const chalk = require("chalk");

const pkg = require("./package.json");
const command = require("./dist/index.js");

async function main() {
  const cli = meow(
    `${chalk.white("Usage")}
    $ ${chalk.cyan("contentz-build")} Run the build script
    $ ${chalk.cyan("contentz-build help")} Show this message
  `,
    {
      description: `${chalk.cyan("Contentz Build")} - ${pkg.description}`
    }
  );

  let args = cli.input;
  cmd = (args[0] || "").toLowerCase();

  switch (cmd) {
    case "help": {
      return cli.showHelp(0);
    }
    default: {
      await command();
      return;
    }
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
