import { resolve } from "path";

function loadModule(path: string) {
  try {
    const module = require(resolve(path));
    if (module.default) return module.default;
    return module;
  } catch(error) {
    if (error.code === "MODULE_NOT_FOUND") {
      console.error(
        `Error: The module ${error.message.slice(
          "Cannot find module ".length
        )} in the file '${path}' could not be found.`
      );
      process.exit(1);
    } else {
      console.error(error);
      process.exit(1);
    }
  }
}

export { loadModule };
