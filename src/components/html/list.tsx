import { jsx } from "@emotion/core";

function UL(props: any) {
  return (
    <ul
      {...props}
      css={{
        fontSize: "1em",
        fontWeight: "normal",
        marginLeft: "-2rem",
        paddingLeft: "2rem",
        listStyleType: "square",
        "@media (max-width: 767px)": {
          marginLeft: 0,
          paddingLeft: "2rem"
        },
        ul: {
          paddingLeft: "3.25rem"
        }
      }}
    />
  );
}

function OL(props: any) {
  return (
    <ol
      {...props}
      css={{
        fontSize: "1em",
        fontWeight: "normal",
        marginLeft: "-2rem",
        paddingLeft: "2rem",
        "@media (max-width: 767px)": {
          marginLeft: 0,
          paddingLeft: "2rem"
        },
        ol: {
          paddingLeft: "3.25rem"
        }
      }}
    />
  );
}

function LI(props: any) {
  return <li {...props} css={{ lineHeight: 1.3 }} />;
}

export { UL, OL, LI };
