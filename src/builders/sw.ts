import { minify } from "terser";
import { del, writeFile } from "../utils/fs";
import { check } from "../utils/cache";
import { IState } from "../state";

const path: string = "./public/sw.js";
const pathLoader: string = "./public/load-sw.js";

async function builder(state: IState) {
  if (await check("config.yml", state.config)) return;
  if (state.config.sw === false) {
    try {
      return await Promise.all([
        del(path),
        writeFile(
          pathLoader,
          minify(
            [
              'if ("serviceWorker" in navigator) {',
              '  window.addEventListener("load", () => {',
              "    navigator.serviceWorker.getRegistrations().then(registrations => {",
              "      registrations.forEach(registration => registration.unregister());",
              "    })",
              "  });",
              "}"
            ].join("\n")
          ).code
        )
      ]);
    } catch (error) {
      await del(pathLoader);
      throw error;
    }
  }

  try {
    return await Promise.all([
      writeFile(
        path,
        minify(
          [
            "importScripts(",
            '  "https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js"',
            ");",
            "",
            "if (workbox) {",
            "  workbox.routing.registerRoute(",
            "    context => location.origin && context.url.origin && context.url.pathname !== '/load-sw.js' && context.url.pathname !== '/sw.js',",
            "    new workbox.strategies.NetworkFirst()",
            "  );",
            "}",
            ""
          ].join("\n")
        ).code
      ),
      writeFile(
        pathLoader,
        minify(
          [
            'if ("serviceWorker" in navigator) {',
            '  window.addEventListener("load", () => {',
            '    navigator.serviceWorker.register("/sw.js");',
            "  });",
            "}"
          ].join("\n")
        ).code
      )
    ]);
  } catch (error) {
    await Promise.all([del(path), del(pathLoader)]);
    throw error;
  }
}

export { builder };
