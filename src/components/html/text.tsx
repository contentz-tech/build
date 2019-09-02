import { jsx } from "@emotion/core";
import parse from "parse-url";

function P(props: any) {
  return (
    <p
      {...props}
      css={{
        margin: "1em 0",
        fontSize: "1em"
      }}
    />
  );
}

function Blockquote(props: any) {
  return (
    <blockquote
      {...props}
      css={{
        borderLeft: "3px solid black",
        boxSizing: "border-box",
        paddingLeft: "calc(2em - 3px)",
        marginLeft: "-2em",
        marginRight: 0,
        fontWeight: "normal",
        fontSize: "1em",
        P: {
          margin: 0
        }
      }}
    />
  );
}

function Anchor(props: any) {
  const extraProps = {
    target: !parse(props.href).resource ? "_self" : "_blank",
    ...(!parse(props.href).resource ? {} : { rel: "nofollow noopener" })
  };

  return (
    <a
      {...props}
      {...extraProps}
      css={{
        color: "#004BCC",
        textDecoration: "underline"
      }}
    />
  );
}

export { Anchor, P, Blockquote };
