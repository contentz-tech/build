import glob from "fast-glob";

async function statics(): Promise<string[]> {
  return await glob("./static/**/*");
}

export { statics };
