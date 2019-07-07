const { jsx, ThemeProvider } = require("theme-ui");
const format = require("date-fns/format");

const { Title, Description } = require("./lead");
const Header = require("./header");
const { useIntl } = require("./intl");
const theme = require("../theme");

function ArchivePage({ config = {}, articles = [] } = {}) {
  const { messages, language } = useIntl();

  const locale = require(`date-fns/locale/${language}`);

  return jsx(
    ThemeProvider,
    { theme },
    jsx(Header, { ...config, messages }),
    jsx(
      "section",
      {
        sx: {
          margin: "0 auto",
          maxWidth: "50em",
          "@media (max-width: 50em)": {
            boxSizing: "border-box",
            py: 0,
            px: 5
          }
        }
      },
      jsx(Title, null, messages.archive.title),
      jsx(
        Description,
        null,
        messages.archive.description.replace("${config.title}", config.title)
      ),
      jsx(
        "section",
        null,
        articles
          .filter(article => article.published)
          .sort((a, b) => b.date - a.date)
          .map(article =>
            jsx(
              "article",
              {
                key: JSON.stringify(article),
                sx: {
                  my: 4,
                  mx: 0,
                  fontSize: 5,
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
                }
              },
              article.date &&
                jsx(
                  "time",
                  {
                    dateTime: article.date.toJSON(),
                    sx: {
                      fontWeight: "light",
                      fontSize: 4,
                      mr: 4,
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      gridArea: "date",
                      "@media (max-width: 50em": {
                        mr: 0,
                      },
                      "@media (max-width: 50em) and (orientation: landscape)": {
                        fontsize: 2,
                        marginRight: "0",
                        ml: 4
                      },
                      "@media (max-width: 50em) and (orientation: portrait)": {
                        display: "none",
                        mt: 3
                      }
                    }
                  },
                  format(article.date, "MMMM DD, YYYY", { locale })
                ),
              jsx(
                "h2",
                { sx: { gridArea: "title", margin: 0, fontSize: 5 } },
                jsx(
                  "a",
                  {
                    href: article.path.slice(1, article.path.indexOf(".mdx")),
                    sx: {
                      color: "text"
                    }
                  },
                  article.title
                )
              ),
              article.description &&
                jsx(
                  "p",
                  { sx: { mt: 2, gridArea: "description" } },
                  article.description
                )
            )
          )
      )
    )
  );
}

module.exports = ArchivePage;
