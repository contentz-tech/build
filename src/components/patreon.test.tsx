/** * @jest-environment jsdom */
import '@testing-library/jest-dom/extend-expect'
import { jsx } from "@emotion/core";
import { render } from "@testing-library/react";
import Patreon from "./patreon";
import { StateProvider } from "./state";

const baseState = {
  config: { },
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
    patreon: {
      first: "Do you like my content?",
      link: "Become a Patreon and help me continue writing!"
    }
  }
}

describe("Patreon", () => {
  test("Without Patreon", () => {
    const { asFragment } = render(
      <StateProvider state={{ ...baseState }}>
        <Patreon />
      </StateProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("With Patreon", () => {
    const { asFragment, getByText } = render(
      <StateProvider state={{ ...baseState, config: { patreon: "sergiodxa" } }}>
        <Patreon />
      </StateProvider>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/Do you like my content?/)).toBeInTheDocument();
    expect(getByText(/Become a Patreon and help me continue writing!/))
      .toBeInTheDocument();
    expect(getByText(/Become a Patreon and help me continue writing!/))
      .toHaveAttribute("href", "https://patreon.com/sergiodxa")
  });
});
