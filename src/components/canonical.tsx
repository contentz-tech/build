import { jsx } from "@emotion/core";
import { parse } from "url";

import { Anchor } from "./html/text";
import Card from "./card";
import { useState } from "./state";

interface CanonicalURLProps {
  value: string;
}

function CanonicalURL({ value }: CanonicalURLProps) {
  const state = useState();

  return (
    <Card>
      {state.i18n.canonicalUrl.copy}
      <Anchor href={value} target="_blank" rel="canonical">
        <strong>{parse(value).hostname}</strong>
      </Anchor>
    </Card>
  );
}

export default CanonicalURL;
