import { jsx } from "@emotion/core";

import { Anchor } from "./html/text";
import { useState } from "./state";

function Patreon() {
  const state = useState();
  return (
    <p css={{ margin: 0 }}>
      {state.i18n.patreon.first} <br />{" "}
      <Anchor href={`https://patreon.com/${state.config.patreon}`}>
        {state.i18n.patreon.link}
      </Anchor>
    </p>
  );
}

export default Patreon;
