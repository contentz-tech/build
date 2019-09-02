import { Fragment, FunctionComponent } from "react";
import { jsx } from "@emotion/core";
import { H1, H2, H3, H4, H5, H6 } from "./html/heading";
import { P, Blockquote, Anchor } from "./html/text";
import { Image } from "./html/media";
import { Code, Pre } from "./html/code";
import FileTree from "./file-tree";

const ui = {
  wrapper: (props: any) => <article css={{ fontSize: "1.5vw" }} {...props} />,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  img: Image,
  a: Anchor,
  p: P,
  blockquote: Blockquote,
  code: (props: any) => {
    switch (props.className) {
      case "language-file-tree": {
        return jsx(FileTree, props);
      }
      default: {
        return jsx(Code, props);
      }
    }
  },
  pre: (props: any) => {
    if (props.children.props.props.className === "language-file-tree")
      return props.children;
    return jsx(Pre, { heightLimit: true, ...props });
  }
};

interface SlideProps {
  totalSlides: number;
  Component: FunctionComponent<{ components: any }>;
}

function Slide({ Component, totalSlides }: SlideProps) {
  return (
    <Fragment>
      <section
        id="slide"
        data-total={totalSlides}
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%"
        }}
      >
        <Component components={ui} />
        <script src="/slide.js" />
      </section>
    </Fragment>
  );
}

export default Slide;
