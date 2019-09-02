import { Fragment } from "react";
import { jsx } from "@emotion/core";
import { Title, Description } from "./lead";
import { Anchor } from "./html/text";
import Header from "./header";
import { useState } from "./state";

function ErrorPage() {
  const state = useState();

  return (
    <Fragment>
      <Header />
      <section
        css={{
          boxSizing: "border-box",
          fontSize: "1.25em",
          minHeight: "calc(90vh - 58px)",
          margin: "10vh auto 0",
          maxWidth: "1000px",
          padding: "0 10vw 0",
          "@media (max-width: 1000px)": {
            fontSize: "1em"
          },
          "@media (max-width: 1000px) and (orientation: landscape)": {
            marginBottom: "10vh"
          }
        }}
      >
        <Title>{state.i18n.error.title}</Title>
        <Description>{state.i18n.error.description}</Description>
        <div
          css={{
            a: {
              display: "block"
            }
          }}
        >
          <Anchor href="/">{state.i18n.error.goHome}</Anchor>
          {state.articles.order.length > 0 && (
            <Anchor href="/articles/">{state.i18n.error.goArticles}</Anchor>
          )}
          {state.slides.order.length > 0 && (
            <Anchor href="/slides/">{state.i18n.error.goSlides}</Anchor>
          )}
          {state.links.length > 0 && (
            <Anchor href="/links/">{state.i18n.error.goLinks}</Anchor>
          )}
        </div>
      </section>
    </Fragment>
  );
}

export default ErrorPage;
