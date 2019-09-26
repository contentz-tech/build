/** * @jest-environment jsdom */
import "@testing-library/jest-dom/extend-expect";
import { jsx } from "@emotion/core";
import { render } from "@testing-library/react";
import Header from "./header";
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
    header: {
      mainLinkDescription: "Go back the home page",
      articles: "Articles",
      links: "Links",
      slides: "Talks",
      resume: "CV"
    }
  }
};

describe("Header", () => {
  test("Empty", () => {
    const { asFragment } = render(
      <StateProvider state={baseState}>
        <Header />
      </StateProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("Only Title", () => {
    const { asFragment, getByText } = render(
      <StateProvider
        state={{
          ...baseState,
          config: { ...baseState.config, title: "Contentz" }
        }}
      >
        <Header />
      </StateProvider>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/Contentz/)).toBeInTheDocument();
    expect(getByText(/Contentz/)).toHaveAttribute(
      "title",
      baseState.i18n.header.mainLinkDescription
    );
    expect(getByText(/Contentz/)).toHaveAttribute("href", "/");
  });

  test("Complete", () => {
    const { asFragment, getByText } = render(
      <StateProvider
        state={{
          ...baseState,
          config: {
            ...baseState.config,
            title: "Contentz",
            navigation: [
              { name: "About", path: "/about/" },
              { name: "Books", path: "https://leanpub.com/u/sergiodxa/" }
            ]
          },
          articles: {
            order: ["/articles/test/"],
            byPath: {}
          },
          links: [{ title: "Author Website", url: "https://sergiodxa.com/" }],
          slides: {
            order: ["/slides/test/"],
            byPath: {}
          },
          resume: {
            basics: {}
          }
        }}
      >
        <Header />
      </StateProvider>
    );

    expect(asFragment()).toMatchSnapshot();

    // Title
    expect(getByText(/Contentz/)).toBeInTheDocument();
    expect(getByText(/Contentz/)).toHaveAttribute(
      "title",
      baseState.i18n.header.mainLinkDescription
    );
    expect(getByText(/Contentz/)).toHaveAttribute("href", "/");

    // Content
    expect(getByText(baseState.i18n.header.articles)).toBeInTheDocument();
    expect(getByText(baseState.i18n.header.articles)).toHaveAttribute(
      "target",
      "_self"
    );
    expect(getByText(baseState.i18n.header.articles)).toHaveAttribute(
      "href",
      "/articles/"
    );

    expect(getByText(baseState.i18n.header.links)).toBeInTheDocument();
    expect(getByText(baseState.i18n.header.links)).toHaveAttribute(
      "target",
      "_self"
    );
    expect(getByText(baseState.i18n.header.links)).toHaveAttribute(
      "href",
      "/links/"
    );

    expect(getByText(baseState.i18n.header.slides)).toBeInTheDocument();
    expect(getByText(baseState.i18n.header.slides)).toHaveAttribute(
      "target",
      "_self"
    );
    expect(getByText(baseState.i18n.header.slides)).toHaveAttribute(
      "href",
      "/slides/"
    );

    expect(getByText(baseState.i18n.header.resume)).toBeInTheDocument();
    expect(getByText(baseState.i18n.header.resume)).toHaveAttribute(
      "target",
      "_self"
    );
    expect(getByText(baseState.i18n.header.resume)).toHaveAttribute(
      "href",
      "/cv/"
    );

    // Custom Navigation
    expect(getByText(/About/)).toBeInTheDocument();
    expect(getByText(/About/)).toHaveAttribute("href", "/about/");
    expect(getByText(/About/)).toHaveAttribute("target", "_self");

    expect(getByText(/Books/)).toBeInTheDocument();
    expect(getByText(/Books/)).toHaveAttribute(
      "href",
      "https://leanpub.com/u/sergiodxa/"
    );
    expect(getByText(/Books/)).toHaveAttribute("rel", "nofollow noopener");
    expect(getByText(/Books/)).toHaveAttribute("target", "_blank");
  });
});
