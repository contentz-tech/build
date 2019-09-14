import { jsx } from "@emotion/core";
import slugify from "react-slugify";

function H1(props: any) {
  return jsx("h1", {
    css: {
      fontSize: "2.25em",
      fontWeight: "normal",
      letterSpacing: "-0.028em",
      margin: "1em 0"
    },
    id: slugify(jsx("h1", props)),
    ...props
  });
}

function H2(props: any) {
  return jsx("h2", {
    css: {
      fontSize: "2em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h2", props)),
    ...props
  });
}

function H3(props: any) {
  return jsx("h3", {
    css: {
      fontSize: "1.75em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h3", props)),
    ...props
  });
}

function H4(props: any) {
  return jsx("h4", {
    css: {
      fontSize: "1.5em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h4", props)),
    ...props
  });
}

function H5(props: any) {
  return jsx("h5", {
    css: {
      fontSize: "1.25em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h5", props)),
    ...props
  });
}

function H6(props: any) {
  return jsx("h6", {
    css: {
      fontSize: "1.125em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h6", props)),
    ...props
  });
}

export { H1, H2, H3, H4, H5, H6 };
