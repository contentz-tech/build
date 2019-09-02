import { jsx } from "@emotion/core";
import Card from "../card";

function Image(props: any) {
  const img = (
    <img
      {...props}
      loading="lazy"
      css={{
        maxWidth: "100%",
        verticalAlign: "top"
      }}
    />
  );

  if (!props.title) return img;

  return (
    <Card>
      <figure
        css={{
          textAlign: "center",
          margin: 0,
          width: "100%"
        }}
      >
        {img}
        <figcaption
          css={{
            fontSize: "0.8em",
            textAlign: "center",
            marginTop: "1em",
            color: "rgba(0, 0, 0, 0.7)"
          }}
        >
          {props.title}
        </figcaption>
      </figure>
    </Card>
  );
}

export { Image };
