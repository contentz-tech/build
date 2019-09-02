import { jsx } from "@emotion/core";

import { H1, H2, H3, H4, H5, H6 } from "./html/heading";
import { P, Blockquote, Anchor } from "./html/text";
import { Image } from "./html/media";
import { UL, OL, LI } from "./html/list";
import { Table, TR, TH, TD } from "./html/table";
import { Code, Pre } from "./html/code";
import FileTree from "./file-tree";

export default {
  wrapper: (props: any) => <article {...props} />,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  img: Image,
  ul: UL,
  ol: OL,
  li: LI,
  code: (props: any) => {
    switch (props.className) {
      case "language-file-tree": {
        return <FileTree {...props} />;
      }
      default: {
        return <Code {...props} />;
      }
    }
  },
  pre: (props: any) => {
    if (props.children.props.props.className === "language-file-tree") {
      return props.children;
    }
    return <Pre {...props} />;
  },
  inlineCode: Code,
  a: Anchor,
  p: P,
  blockquote: Blockquote,
  table: Table,
  th: TH,
  tr: TR,
  td: TD
};
