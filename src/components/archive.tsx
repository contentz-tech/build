import { Fragment } from "react";
import { jsx } from "@emotion/core";
import format from "date-fns/format";

import { Title, Description } from "./lead";
import Header from "./header";
import { useState } from "./state";
import { loadLocale } from "../utils/load-locale";

function ArchivePage() {
  const state = useState();

  const locale: any = loadLocale(state.config.language);

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
        <Title>{state.i18n.archive.title}</Title>
        <Description>
          {state.i18n.archive.description.replace(
            "${config.title}",
            state.config.title
          )}
        </Description>
        <section>
          {state.articles.order
            .map(path => state.articles.byPath[path])
            .map(article => (
              <article
                key={JSON.stringify(article)}
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
                {article.date && (
                  <time
                    dateTime={article.date.toJSON()}
                    css={{
                      fontWeight: 200,
                      marginRight: "1em",
                      gridArea: "date",
                      textAlign: "right",
                      "@media (max-width: 50em) and (orientation: landscape)": {
                        fontSize: "0.9em",
                        marginRight: "0",
                        marginLeft: "1em"
                      },
                      "@media (max-width: 50em) and (orientation: portrait)": {
                        display: "none",
                        marginRight: "0",
                        marginTop: "0.5em"
                      }
                    }}
                  >
                    {format(article.date, "MMMM dd, yyyy", { locale })}
                  </time>
                )}
                <h2 css={{ gridArea: "title", margin: 0, fontSize: "1em" }}>
                  <a
                    href={article.path}
                    css={{
                      color: "black"
                    }}
                  >
                    {article.title}
                  </a>
                </h2>
                {article.description && (
                  <p css={{ marginTop: "0.5em", gridArea: "description" }}>
                    {article.description}
                  </p>
                )}
              </article>
            ))}
        </section>
      </section>
    </Fragment>
  );
}

export default ArchivePage;
