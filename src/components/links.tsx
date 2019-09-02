import { Fragment } from "react";
import { jsx } from "@emotion/core";

import { Title } from "./lead";
import Header from "./header";
import { useState } from "./state";

function LinksPage() {
  const state = useState();

  return (
    <Fragment>
      <Header />
      <section
        css={{
          margin: "0 auto",
          maxWidth: "50em",
          "@media (max-width: 50em)": {
            boxSizing: "border-box",
            padding: "0 1.5em"
          }
        }}
      >
        <Title>{state.i18n.links.title}</Title>
        <ul css={{ listStyleType: "none", paddingLeft: 0 }}>
          {state.links.map(link => (
            <li
              key={JSON.stringify(link)}
              css={{
                margin: "1em 0",
                fontSize: "1.25em",
                display: "grid",
                gridTemplateColumns: "1fr 3fr",
                gridTemplateRows: "2",
                gridTemplateAreas: '"date title" ". description"',
                "@media (max-width: 50em) and (orientation: landscape)": {
                  gridTemplateColumns: "1fr auto",
                  gridTemplateRows: "auto auto",
                  gridTemplateAreas: '"title date" "description description"'
                },
                "@media (max-width: 50em) and (orientation: portrait)": {
                  gridTemplateColumns: "auto",
                  gridTemplateRows: "auto auto auto",
                  gridTemplateAreas: '"title" "date" "description"'
                }
              }}
            >
              <h2 css={{ gridArea: "title", margin: 0, fontSize: "1em" }}>
                <a href={link.url} css={{ color: "black" }}>
                  {link.title}
                </a>
              </h2>
            </li>
          ))}
        </ul>
      </section>
    </Fragment>
  );
}

export default LinksPage;
