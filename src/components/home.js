const { jsx, ThemeProvider } = require("theme-ui");

const { Title, Description } = require("./lead");
const Header = require("./header");
const Patreon = require("./patreon");

const Twitter = require("./icons/twitter");
const Meetup = require("./icons/meetup");
const NPM = require("./icons/npm");
const GitHub = require("./icons/github");
const Dev = require("./icons/dev");
const LinkedIn = require("./icons/linkedin");
const Email = require("./icons/email");

const theme = require("../theme");

function formatURL({ name, value }) {
  switch (name.toLowerCase()) {
    case "twitter":
      return { icon: Twitter, link: `https://twitter.com/${value}` };
    case "meetup":
      return {
        icon: Meetup,
        link: `https://www.meetup.com/members/${value}/`
      };
    case "npm":
      return { icon: NPM, link: `https://www.npmjs.com/~${value}` };
    case "github":
      return { icon: GitHub, link: `https://github.com/${value}` };
    case "dev":
      return { icon: Dev, link: `https://dev.to/${value}` };
    case "linkedin":
      return { icon: LinkedIn, link: `https://www.linkedin.com/in/${value}/` };
    default:
      return null;
  }
}

const Icon = props =>
  jsx(
    "i",
    {
      ...props,
      sx: {
        svg: {
          width: 5,
          height: 5,
          fill: "black"
        }
      }
    },
    props.children
  );

function HomePage({ config = {} } = {}) {
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
          margin: "10vh auto 0",
          maxWidth: "1000px",
          padding: "0 10vw 0",
          "@media (max-width: 1000px)": {
            fontSize: 3
          },
          "@media (max-width: 1000px) and (orientation: landscape)": {
            marginBottom: "10vh"
          }
        }
      },
      jsx(Title, null, config.title),
      jsx(Description, null, config.description),
      jsx(
        "div",
        null,
        config.social &&
          Object.entries(config.social).map(([name, value]) =>
            jsx(
              "a",
              {
                key: name,
                href: formatURL({ name, value }).link,
                title: name,
                sx: {
                  display: "inline-flex",
                  color: "text",
                  textDecoration: "none",
                  my: 0,
                  mx: 2,
                  ":first-of-type": {
                    marginLeft: 0
                  },
                  ":last-of-type": {
                    marginRight: 0
                  },
                  "@media (prefers-color-scheme: dark)": { color: "white" }
                }
              },
              jsx(Icon, null, jsx(formatURL({ name, value }).icon))
            )
          ),
        config.email &&
          jsx(
            "a",
            {
              href: `mailto:${config.email}`,
              sx: {
                display: "inline-flex",
                color: "text",
                textDecoration: "none",
                my: 0,
                mx: 2,
                ":first-of-type": {
                  marginLeft: 0
                },
                ":last-of-type": {
                  marginRight: 0
                }
              }
            },
            jsx(Icon, null, jsx(Email))
          )
      ),
      config.patreon && jsx("br"),
      config.patreon && jsx(Patreon, { name: config.patreon })
    )
  );
}

module.exports = HomePage;
