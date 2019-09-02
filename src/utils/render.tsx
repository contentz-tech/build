import { renderToStaticNodeStream } from "react-dom/server";
import { renderStylesToNodeStream } from "emotion-server";
import { jsx } from "@emotion/core";
import { IState } from "../state";
import { StateProvider } from "../components/state";

interface RenderConfiguration {
  state: IState;
}

type Rendered = Promise<string>;

function render(ui: JSX.Element, configuration: RenderConfiguration): Rendered {
  return new Promise(resolve => {
    let html: string = "";
    const stream = renderToStaticNodeStream(
      <StateProvider state={configuration.state}>{ui}</StateProvider>
    ).pipe(renderStylesToNodeStream());
    stream.on("data", (chunk: string) => {
      html += chunk;
    });
    stream.on("end", () => {
      resolve(html);
    });
  });
}

export { render };
