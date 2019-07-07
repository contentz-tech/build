const React = require("react");
const { jsx, Styled } = require("theme-ui");
const slugify = require("react-slugify").default;

const FileTree = require("./file-tree");

const Card = require("./card");

const Pre = props => jsx(Card, { selectable: true }, jsx(Styled.pre, props));

const Image = props => {
  const img = jsx(Styled.img, {
    ...props,
    loading: "lazy"
  });
  if (!props.title) return img;
  return jsx(
    Card,
    null,
    jsx(
      "figure",
      {
        sx: {
          textAlign: "center",
          margin: 0,
          width: "100%"
        }
      },
      img,
      jsx(
        "figcaption",
        {
          sx: {
            fontSize: 2,
            textAlign: "center",
            mt: 3,
            color: "muted"
          }
        },
        props.title
      )
    )
  );
};

const heading = tagName => props => {
  return jsx(Styled[tagName], { ...props, id: slugify(jsx("h2", props)) });
};

module.exports = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "img",
  "ul",
  "ol",
  "li",
  "code",
  "inlineCode",
  "a",
  "p",
  "blockquote",
  "table",
  "th",
  "tr",
  "thead"
]
  .map(tagName => {
    switch (tagName) {
      case "inlineCode": {
        return [tagName, Styled.code];
      }
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6": {
        return [tagName, heading(tagName)];
      }
      case "img": {
        return [tagName, Image];
      }
      default: {
        return [tagName, Styled[tagName]];
      }
    }
  })
  .reduce(
    (components, [tagName, component]) => ({
      ...components,
      [tagName]: component
    }),
    { wrapper: React.Fragment, pre: Pre }
  );
