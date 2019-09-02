import { jsx } from "@emotion/core";

import { Anchor } from "./html/text";
import Card from "./card";
import { useState } from "./state";

interface ReadNextProps {
  title: string;
  path: string;
  description?: string;
}

function ReadNext({ title, path, description }: ReadNextProps) {
  const state = useState();

  return (
    <Card>
      <h6
        css={{
          fontSize: "1em",
          margin: 0,
          marginTop: "0.75rem"
        }}
      >
        {state.i18n.readNext.copy} <Anchor href={path}>{title}</Anchor>
      </h6>
      <p
        css={{
          marginBottom: "0.75rem",
          fontSize: "0.8em"
        }}
      >
        {description}
      </p>
    </Card>
  );
}

export default ReadNext;
