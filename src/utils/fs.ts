import fs from "fs";
import { promisify } from "util";
import mkdirp from "mkdirp";
import rimraf from "rimraf";

const writeFile = promisify(fs.writeFile);

const readFile = promisify(fs.readFile);

const makeDir = promisify(mkdirp);

function exists(path: fs.PathLike): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.stat(path, error => {
      if (error && error.code === "ENOENT") {
        return resolve(false);
      }
      if (error) {
        return reject(error);
      }
      return resolve(true);
    });
  });
}

const del = promisify(rimraf);

export { writeFile, readFile, makeDir, exists, del };
