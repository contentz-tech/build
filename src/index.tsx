import * as React from "react";
import { jsx } from "@emotion/core";
import { render, Box, Color, Text } from "ink";
import { getState, IState } from "./state";
import { build } from "./build";
import termSize from "term-size";

function LogState({ state }: { state?: IState }) {
  if (!state) return null;

  const hasArticles = Object.keys(state.articles.byPath).length > 0;
  const hasPages = Object.keys(state.pages.byPath).length > 0;
  const hasSlides = Object.keys(state.slides.byPath).length > 0;
  const hasResume = !!state.resume;
  const hasLinks = state.links.length > 0;
  const hasStatics = state.statics.length > 0;

  return (
    <Box flexDirection="column">
      {!hasArticles ? (
        <Box>
          Articles: <Color cyan>No</Color>
        </Box>
      ) : Object.keys(state.articles.byPath).length ===
        state.articles.order.length ? (
        <Box>
          Articles <Color cyan>{state.articles.order.length}</Color>
        </Box>
      ) : (
        <Box>
          Articles{" "}
          <Color cyan>{Object.keys(state.articles.byPath).length}</Color> with{" "}
          <Color cyan>{state.articles.order.length}</Color> published
        </Box>
      )}
      {!hasSlides ? (
        <Box>
          Slides: <Color cyan>No</Color>
        </Box>
      ) : Object.keys(state.slides.byPath).length ===
        state.slides.order.length ? (
        <Box>
          Slides <Color cyan>{state.slides.order.length}</Color>
        </Box>
      ) : (
        <Box>
          Slides <Color cyan>{Object.keys(state.slides.byPath).length}</Color>{" "}
          with <Color green>{state.slides.order.length}</Color> published
        </Box>
      )}
      {!hasPages ? (
        <Box>
          Pages: <Color cyan>No</Color>
        </Box>
      ) : (
        <Box>
          Pages <Color cyan>{Object.keys(state.pages.byPath).length}</Color>
        </Box>
      )}
      {!hasLinks ? (
        <Box>
          Links <Color cyan>No</Color>
        </Box>
      ) : (
        <Box>
          Links <Color cyan>{state.links.length}</Color>
        </Box>
      )}
      {!hasStatics ? (
        <Box>
          Statics <Color cyan>No</Color>
        </Box>
      ) : (
        <Box>
          Statics <Color cyan>{state.statics.length}</Color>
        </Box>
      )}
      {!hasResume ? (
        <Box>
          Resume <Color cyan>No</Color>
        </Box>
      ) : (
        <Box>
          Resume <Color cyan>Yes</Color>
        </Box>
      )}
    </Box>
  );
}

class App extends React.Component<
  any,
  { state?: IState; built: boolean; error: Error }
> {
  state = {
    state: undefined,
    built: false,
    error: new Error("empty")
  };

  async componentDidMount() {
    try {
      const state = await getState();
      this.setState({ state });
      await build(state);
      this.setState({ built: true });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { state, built, error } = this.state;
    return (
      <Box paddingX={2} paddingY={1} flexDirection="column">
        <Color green>Contentz</Color>
        <Box paddingY={1}>
          {!state && (
            <Text>
              <Color green>Reading project state from file system.</Color>
            </Text>
          )}
          {state && <LogState state={state} />}
        </Box>
        <Box paddingY={1}>
          {state && !built && (
            <Color green>Building an optimized website.</Color>
          )}
          {state && built && (
            <Color green>Website built, try it with `npx serve public`.</Color>
          )}
        </Box>
        {error.message !== "empty" && (
          <Box>
            {"=".repeat(termSize().columns)}
            <Color red>{error.stack}</Color>
            {"=".repeat(termSize().columns)}
          </Box>
        )}
      </Box>
    );
  }
}

async function main() {
  render(<App />);
}

export = main;
