import { jsx } from "@emotion/core";
import GitHubIcon from "./icons/github";
import Patreon from "./patreon";
import { useState } from "./state";

function Footer(props: { repositoryPath?: string }) {
  // don't render footer if it's going to empty
  const state = useState();
  if (!state.config.patreon && !state.config.repository) return null;

  return (
    <footer
      css={{
        background: "white",
        borderTop: "1px solid #eaeaea",
        padding: "2em 0",
        marginTop: "3em"
      }}
    >
      <div
        css={{
          maxWidth: "60rem",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          "@media (max-width: 60rem) and (orientation: portrait)": {
            flexDirection: "column",
            padding: "0 2em"
          },
          "@media (max-width: 60rem) and (orientation: landscape)": {
            padding: "0 2em"
          }
        }}
      >
        {state.config.patreon && (
          <div css={{ fontsize: "0.9em" }}>
            <Patreon />
          </div>
        )}
        {props.repositoryPath && (
          <a
            href={props.repositoryPath}
            rel="alternate"
            title={state.i18n.footer.editOnGitHub}
            css={{
              color: "black",
              textDecoration: "none",
              fontSize: "0.8em",
              display: "inline-flex",
              alignItems: "center",
              "@media (max-width: 60rem)": {
                marginTop: "1em"
              }
            }}
          >
            {state.i18n.footer.editOnGitHub}{" "}
            <i css={{ height: "18px", width: "18px", marginLeft: "10px" }}>
              <GitHubIcon />
            </i>
          </a>
        )}
      </div>
    </footer>
  );
}

export default Footer;
