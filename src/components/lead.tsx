import { jsx } from "@emotion/core";
import format from "date-fns/format";
import { useState } from "./state";

function Title(props: {
  children: JSX.Element[] | JSX.Element | string | undefined;
}) {
  return (
    <h1
      css={{
        fontSize: "2.25em",
        fontWeight: "bold",
        letterSpacing: "-0.028em",
        margin: "1em 0"
      }}
    >
      {props.children}
    </h1>
  );
}

function Description(props: {
  children: JSX.Element[] | JSX.Element | string | undefined;
}) {
  return (
    <p
      css={{
        borderLeft: "3px solid black",
        boxSizing: "border-box",
        paddingLeft: "calc(0.5em - 3px)",
        margin: "-1em 0 1em -0.5em",
        fontSize: "1.5em",
        fontWeight: 200
      }}
    >
      {props.children}
    </p>
  );
}

function Date(props: { date: Date }) {
  const state = useState();

  const locale = require(`date-fns/locale/${state.config.language}`);

  return (
    <time
      dateTime={props.date.toJSON()}
      css={{
        position: "absolute",
        right: "0.5em",
        bottom: "100%"
      }}
    >
      <strong>{format(props.date, "MMMM DD, YYYY", { locale })}</strong>
    </time>
  );
}

export { Title, Description, Date };
