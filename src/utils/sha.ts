import crypto from "crypto";

const cache = new Map();

function sha(file: string): string {
  if (cache.has(file)) return cache.get(file);
  const shasum = crypto.createHash("sha1");
  shasum.update(file);
  const sha = shasum.digest("hex");
  cache.set(file, sha);
  return sha;
}

export { sha };
