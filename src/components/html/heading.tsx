import { jsx } from "@emotion/core";
import slugify from "react-slugify";

const H1 = (props: any) =>
  jsx("h1", {
    css: {
      fontSize: "2.25em",
      fontWeight: "normal",
      letterSpacing: "-0.028em",
      margin: "1em 0"
    },
    id: slugify(jsx("h1", props)),
    ...props
  });

const H2 = (props: any) =>
  jsx("h2", {
    css: {
      fontSize: "2em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h2", props)),
    ...props
  });

const H3 = (props: any) =>
  jsx("h3", {
    css: {
      fontSize: "1.75em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h3", props)),
    ...props
  });

const H4 = (props: any) =>
  jsx("h4", {
    css: {
      fontSize: "1.5em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h4", props)),
    ...props
  });

const H5 = (props: any) =>
  jsx("h5", {
    css: {
      fontSize: "1.25em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h5", props)),
    ...props
  });

const H6 = (props: any) =>
  jsx("h6", {
    css: {
      fontSize: "1.125em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h6", props)),
    ...props
  });

export { H1, H2, H3, H4, H5, H6 };
