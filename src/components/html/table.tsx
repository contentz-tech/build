import { jsx } from "@emotion/core";

function Table(props: any) {
  return (
    <table
      {...props}
      css={{
        fontSize: "1em",
        width: "100%"
      }}
    />
  );
}

function TH(props: any) {
  return (
    <th
      {...props}
      css={{
        padding: 5,
        color: "#9b9b9b",
        fontStyle: "oblique",
        fontWeight: "normal",
        textAlign: "left"
      }}
    />
  );
}

function TR(props: any) {
  return <tr {...props} css={{ padding: 5 }} />;
}

function TD(props: any) {
  return <td {...props} css={{ padding: 5 }} />;
}

export { Table, TH, TR, TD };
