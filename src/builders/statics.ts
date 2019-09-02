import copy from "cpy";
// import { exists, makeDir } from "../utils/fs";
import { IState } from "../state";
import { del } from "../utils/fs";
import { check } from "../utils/cache";

async function builder(state: IState) {
  if (await check("static", state.statics)) return;
  await del("./public/static");
  if (state.statics.length > 0) {
    await copy(state.statics, "./public", { parents: true });
  }
}

export { builder };
