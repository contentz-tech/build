import { jsx } from "@emotion/core";
import Card from "../card";

function Code(props: any) {
  return (
    <code
      {...props}
      css={{
        color: "#f81ce5",
        fontFamily:
          "Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",
        fontSize: "0.8em",
        whiteSpace: "pre-wrap",
        ":before": {
          content: "'`'"
        },
        ":after": {
          content: "'`'"
        }
      }}
    />
  );
}

function Pre({ heightLimit = false, ...props }: any) {
  return (
    <Card selectable>
      <pre
        {...props}
        css={{
          overflowX: "scroll",
          maxHeight: heightLimit ? "30vh" : "none",
          code: {
            color: "black",
            ":before": {
              content: "''"
            },
            ":after": {
              content: "''"
            }
          }
        }}
      />
    </Card>
  );
}

export { Code, Pre };
