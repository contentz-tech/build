/** * @jest-environment jsdom */
import "@testing-library/jest-dom/extend-expect";
import { jsx } from "@emotion/core";
import { render } from "@testing-library/react";
import Footer from "./footer";
import { StateProvider } from "./state";

const baseState = {
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
    footer: { editOnGitHub: "Edit it on GitHub" },
    patreon: {
      first: "Do you like my content?",
      link: "Become a Patreon and help me continue writing!"
    }
  }
};

describe("Footer", () => {
  test("Empty", () => {
    const { asFragment } = render(
      <StateProvider state={baseState}>
        <Footer />
      </StateProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("Only Repository", () => {
    const { asFragment, getByText } = render(
      <StateProvider
        state={{
          ...baseState,
          config: {
            ...baseState.config,
            repository: "https://github.com/contentz-tech/build"
          }
        }}
      >
        <Footer repositoryPath="https:/github.com/contentz-tech/build/edit/master/src/components/footer.test.tsx" />
      </StateProvider>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(getByText(baseState.i18n.footer.editOnGitHub)).toBeInTheDocument();
    expect(getByText(baseState.i18n.footer.editOnGitHub)).toHaveAttribute(
      "rel",
      "alternate"
    );
    expect(getByText(baseState.i18n.footer.editOnGitHub)).toHaveAttribute(
      "title",
      baseState.i18n.footer.editOnGitHub
    );
    expect(getByText(baseState.i18n.footer.editOnGitHub)).toHaveAttribute(
      "href",
      "https:/github.com/contentz-tech/build/edit/master/src/components/footer.test.tsx"
    );
  });

  test("With Patreon", () => {
    const { asFragment, getByText } = render(
      <StateProvider state={{ ...baseState, config: { patreon: "sergiodxa" } }}>
        <Footer />
      </StateProvider>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(getByText(/Do you like my content?/)).toBeInTheDocument();
    expect(
      getByText(/Become a Patreon and help me continue writing!/)
    ).toBeInTheDocument();
    expect(
      getByText(/Become a Patreon and help me continue writing!/)
    ).toHaveAttribute("href", "https://patreon.com/sergiodxa");
  });

  test("Complete", () => {
    const { asFragment, getByText } = render(
      <StateProvider
        state={{
          ...baseState,
          config: {
            patreon: "sergiodxa",
            repository: "https://github.com/contentz-tech/build"
          }
        }}
      >
        <Footer repositoryPath="https:/github.com/contentz-tech/build/edit/master/src/components/footer.test.tsx" />
      </StateProvider>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(getByText(baseState.i18n.footer.editOnGitHub)).toBeInTheDocument();
    expect(getByText(baseState.i18n.footer.editOnGitHub)).toHaveAttribute(
      "rel",
      "alternate"
    );
    expect(getByText(baseState.i18n.footer.editOnGitHub)).toHaveAttribute(
      "title",
      baseState.i18n.footer.editOnGitHub
    );
    expect(getByText(baseState.i18n.footer.editOnGitHub)).toHaveAttribute(
      "href",
      "https:/github.com/contentz-tech/build/edit/master/src/components/footer.test.tsx"
    );

    expect(getByText(/Do you like my content?/)).toBeInTheDocument();
    expect(
      getByText(/Become a Patreon and help me continue writing!/)
    ).toBeInTheDocument();
    expect(
      getByText(/Become a Patreon and help me continue writing!/)
    ).toHaveAttribute("href", "https://patreon.com/sergiodxa");
  });
});
