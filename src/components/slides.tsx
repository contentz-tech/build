import { Fragment } from "react";
import { jsx } from "@emotion/core";
import format from "date-fns/format";

import { Title } from "./lead";
import Header from "./header";
import { useState } from "./state";

function SlidesPage() {
  const state = useState();
  const locale = require(`date-fns/locale/${state.config.language}`);

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
        <Title>{state.i18n.slides.title}</Title>
        <section>
          {state.slides.order
            .map(path => state.slides.byPath[path])
            .map(slide => (
              <article
                key={JSON.stringify(slide)}
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
                {slide.date && (
                  <time dateTime={slide.date.toJSON()}>
                    {format(slide.date, "MMMM DD, YYYY", { locale })}
                  </time>
                )}
                <h2 css={{ gridArea: "title", margin: 0, fontSize: "1em" }}>
                  <a href={slide.path} css={{ color: "black" }}>
                    {slide.title}
                  </a>
                </h2>
                {slide.description && (
                  <p css={{ marginTop: "0.5em", gridArea: "description" }}>
                    {slide.description}
                  </p>
                )}
              </article>
            ))}
        </section>
      </section>
    </Fragment>
  );
}

export default SlidesPage;
