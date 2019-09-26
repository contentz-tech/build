/** * @jest-environment jsdom */
import '@testing-library/jest-dom/extend-expect'
import { jsx } from "@emotion/core";
import { render } from "@testing-library/react";
import { Title, Description, Date as DateTime } from "./lead";
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
    patreon: {
      first: "Do you like my content?",
      link: "Become a Patreon and help me continue writing!"
    }
  }
}

describe("Lead", () => {
  test("Title", () => {
    const { asFragment, getByText } = render(<Title>Contentz.tech</Title>);
    
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/Contentz.tech/)).toBeInTheDocument();
  });

  test("Description", () => {
    const { asFragment, getByText } = render(
      <Description>Create Content, Get a Highly Optimized Website</Description>
    );
    
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/Create Content, Get a Highly Optimized Website/))
      .toBeInTheDocument();
  });

  test("Date", () => {
    const { asFragment, getByText } = render(
      <StateProvider state={state}>
        <DateTime date={new Date("2019-09-15T00:12:57.350Z")} />
      </StateProvider>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/September 14, 2019/)).toBeInTheDocument();
  });
});
