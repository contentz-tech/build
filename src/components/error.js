const { Fragment } = require("react");
const { jsx, ThemeProvider, Styled } = require("theme-ui");

const { Title, Description } = require("./lead");
const Header = require("./header");
const { useIntl } = require("./intl");
const theme = require("../theme");

function ErrorPage({ config = {} } = {}) {
  const { messages } = useIntl();

  return jsx(
    ThemeProvider,
    { theme },
    jsx(Header, { ...config }),
    jsx(
      "section",
      {
        sx: {
          boxSizing: "border-box",
          fontSize: 4,
          minHeight: "calc(90vh - 58px)",
          mt: "10vh",
          mx: "auto",
          mb: 0,
          maxWidth: "1000px",
          py: 0,
          px: "10vw",
          "@media (max-width: 1000px)": {
            fontSize: 2
          },
          "@media (max-width: 1000px) and (orientation: landscape)": {
            mb: "10vh"
          }
        }
      },
      jsx(Title, null, messages.error.title),
      jsx(Description, null, messages.error.description),
      jsx(
        "div",
        {
          sx: {
            a: {
              display: "block"
            }
          }
        },
        jsx(Styled.a, { href: "/" }, messages.error.goHome),
        config.hasArticles &&
          jsx(Styled.a, { href: "/articles/" }, messages.error.goArticles),
        config.hasLinks &&
          jsx(Styled.a, { href: "/links/" }, messages.error.goLinks),
        config.hasSlides &&
          jsx(Styled.a, { href: "/slides/" }, messages.error.goSlides)
      )
    )
  );
}

module.exports = ErrorPage;
