const { jsx } = require("theme-ui");

const GitHubIcon = require("./icons/github");
const Patreon = require("./patreon");
const { useIntl } = require("./intl");

const formatURL = (base, file) => {
  const _base = base.endsWith("/") ? base.slice(0, base.length - 1) : base;
  const _file = file.startsWith("/") ? file.slice(1) : file;
  return [_base, "blob/master", _file].join("/");
};

function Footer(props) {
  // don't render footer if it's going to empty
  if (!props.patreon && !props.repository) return null;
  const { messages } = useIntl();

  return jsx(
    "footer",
    {
      sx: {
        backgroundColor: "background",
        borderTop: "1px solid #eaeaea",
        py: 5,
        mt: 8,
      }
    },
    jsx(
      "div",
      {
        sx: {
          maxWidth: "60rem",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          "@media (max-width: 60rem)": {
            py: 0,
            px: 6,
            "@media (orientation: portrait)": {
              flexDirection: "column"
            }
          }
        }
      },
      props.patreon
        ? jsx(
            "div",
            { sx: { fontSize: 1 } },
            jsx(Patreon, { name: props.patreon })
          )
        : jsx("div"),
      props.repository &&
        jsx(
          "a",
          {
            href: formatURL(props.repository, props.file),
            rel: "alternate",
            title: messages.footer.editOnGitHub,
            sx: {
              color: "text",
              textDecoration: "none",
              fontSize: 1,
              display: "inline-flex",
              alignItems: "center",
              "@media (max-width: 60rem)": {
                mt: 4
              },
            }
          },
          messages.footer.editOnGitHub,
          jsx(
            "i",
            { sx: { height: 4, width: 4, ml: 3 } },
            jsx(GitHubIcon)
          )
        )
    )
  );
}

module.exports = Footer;
