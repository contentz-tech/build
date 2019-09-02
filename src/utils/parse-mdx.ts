import mdx from "@mdx-js/mdx";
import { transform } from "@babel/core";

async function parseMDX(content: string) {
  const source = await mdx(content);

  return transform(
    [
      `const React = require("react");`,
      `const { css } = require("@emotion/core");`,
      `const { MDXTag } = require("@mdx-js/tag");`,
      source
    ].join("\n"),
    {
      presets: [
        [
          require("@babel/preset-env"),
          {
            targets: { node: true }
          }
        ],
        require("@emotion/babel-preset-css-prop")
      ]
    }
  );
}

export { parseMDX };
