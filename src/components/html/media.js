const { jsx, Styled } = require("theme-ui");
const Card = require("../card");

exports.Image = props => {
  const img = jsx(Styled.img, {
    ...props,
    loading: "lazy",
    css: {
      maxWidth: "100%",
      verticalAlign: "top"
    }
  });

  if (!props.title) return img;

  return jsx(
    Card,
    null,
    jsx(
      "figure",
      {
        css: {
          textAlign: "center",
          margin: 0,
          width: "100%"
        }
      },
      img,
      props.title &&
        jsx(
          "figcaption",
          {
            css: {
              fontSize: "0.8em",
              textAlign: "center",
              marginTop: "1em",
              color: "rgba(0, 0, 0, 0.7)"
            }
          },
          props.title
        )
    )
  );
};
