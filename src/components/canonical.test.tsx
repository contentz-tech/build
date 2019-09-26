/** * @jest-environment jsdom */
import "@testing-library/jest-dom/extend-expect";
import { jsx } from "@emotion/core";
import { render } from "@testing-library/react";
import CanonicalURL from "./canonical";
import { StateProvider } from "./state";

const state = {
  config: { language: "en" },
  articles: {
    order: [],
    byPath: {}
  },
  slides: {
    order: [],
    byPath: {}
  },
  statics: [],
  pages: {
    order: [],
    byPath: {}
  },
  links: [],
  i18n: {
    canonicalUrl: { copy: "Originally published at " }
  }
};

describe("CanonicalURL", () => {
  test("Without value", () => {
    const { asFragment } = render(
      <StateProvider state={state}>
        <CanonicalURL />
      </StateProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("With value", () => {
    const { asFragment, getByText, getByTitle } = render(
      <StateProvider state={state}>
        <CanonicalURL value="https://sergiodxa.com/contentz" />
      </StateProvider>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(getByText(/sergiodxa.com/)).toBeInTheDocument();

    expect(getByTitle(/sergiodxa.com/)).toBeInTheDocument();

    expect(getByTitle(/sergiodxa.com/)).toHaveAttribute(
      "href",
      "https://sergiodxa.com/contentz"
    );
    expect(getByTitle(/sergiodxa.com/)).toHaveAttribute("target", "_blank");
    expect(getByTitle(/sergiodxa.com/)).toHaveAttribute("rel", "canonical");
  });
});
