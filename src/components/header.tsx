import { jsx } from "@emotion/core";

import { Anchor } from "./html/text";
import { useState } from "./state";

function Header() {
  const state = useState();

  const hasNavigation =
    state.articles.order.length > 0 ||
    state.links.length > 0 ||
    state.slides.order.length > 0 ||
    Boolean(state.resume) ||
    (state.config.navigation && state.config.navigation.length > 0);

  if (!Boolean(state.config.title) && !hasNavigation) return null;

  return (
    <header
      css={{
        background: "white",
        borderBottom: "1px solid #eaeaea",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.12)",
        padding: "1em 0",
        "@media print": {
          display: "none"
        }
      }}
    >
      <div
        css={{
          maxWidth: "60rem",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "@media (max-width: 60rem)": {
            padding: "0 1em"
          }
        }}
      >
        {state.config.title && (
          <a
            href="/"
            title={state.i18n.header.mainLinkDescription}
            css={{
              flex: 1,
              whiteSpace: "nowrap",
              color: "black",
              textDecoration: "none"
            }}
          >
            {state.config.title}
          </a>
        )}
        {hasNavigation && (
          <nav
            css={{
              overflowX: "auto",
              margin: "-1em 0",
              padding: "1em 0",
              a: { padding: "0 1em" }
            }}
          >
            {state.articles.order.length > 0 && (
              <Anchor href="/articles/">{state.i18n.header.articles}</Anchor>
            )}
            {state.links.length > 0 && (
              <Anchor href="/links/">{state.i18n.header.links}</Anchor>
            )}
            {state.slides.order.length > 0 && (
              <Anchor href="/slides/">{state.i18n.header.slides}</Anchor>
            )}
            {state.resume && (
              <Anchor href="/cv/">{state.i18n.header.resume}</Anchor>
            )}
            {state.config.navigation &&
              state.config.navigation.length > 0 &&
              state.config.navigation.map(({ name, path }) => (
                <Anchor
                  key={path + name}
                  href={path.endsWith("/") ? path : `${path}/`}
                >
                  {name}
                </Anchor>
              ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
