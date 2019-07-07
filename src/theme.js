const heading = {
  fontFamily: "heading",
  lineHeight: "heading",
  fontWeight: "heading"
};

const BASE_FONT = 18;

const base = {
  breakpoints: ["50em"],
  space: [0, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.25].map(n => BASE_FONT * n),
  sizes: [0, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.25].map(n => BASE_FONT * n),
  fonts: {
    body:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    heading: "inherit",
    monospace:
      "Monaco, Menlo, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif"
  },
  fontSizes: [0.7, 0.8, 1, 1.125, 1.25, 1.5, 1.75, 2, 2.5].map(
    n => BASE_FONT * n
  ),
  fontWeights: {
    light: 200,
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  colors: {
    text: "black",
    background: "white",
    primary: "#004bcc",
    secondary: "#f81ce5",
    muted: "rgba(0, 0, 0, 0.7)"
  },
  styles: {
    h1: {
      ...heading,
      fontSize: 8
    },
    h2: {
      ...heading,
      fontSize: 7
    },
    h3: {
      ...heading,
      fontSize: 6
    },
    h4: {
      ...heading,
      fontSize: 5
    },
    h5: {
      ...heading,
      fontSize: 4
    },
    h6: {
      ...heading,
      fontSize: 3
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
        ":before": {
          content: "''"
        },
        ":after": {
          content: "''"
        }
      }
    },
    code: {
      color: "secondary",
      fontFamily: "monospace",
      whiteSpace: "pre-wrap",
      ":before": {
        content: "'`'"
      },
      ":after": {
        content: "'`'"
      }
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid"
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid"
    },
    a: {
      color: "primary"
    },
    img: {
      maxWidth: "100%",
      verticalAlign: "top"
    },
    ul: {
      fontSize: 2,
      fontWeight: "normal",
      marginLeft: -6,
      paddingLeft: 6,
      listStyleType: "square",
      "@media (max-width: 767px)": {
        marginLeft: 0,
        paddingLeft: 6
      },
      ul: {
        paddingLeft: 9
      }
    }
  }
};

module.exports = base;
