/** * @jest-environment jsdom */
import '@testing-library/jest-dom/extend-expect'
import { jsx } from "@emotion/core";
import { render } from "@testing-library/react";
import { P, Blockquote, Anchor } from "./text";

describe("Text", () => {
  test("Paragraph", () => {
    const { asFragment, getByText } = render(
      <P>This is a test of a paragraph rendered by Contentz.</P>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(getByText(/This is a test of a paragraph rendered by Contentz/))
      .toHaveTextContent("This is a test of a paragraph rendered by Contentz.");
  });

  test("Blockquote", () => {
    const { asFragment, getByText } = render(
      <Blockquote>
        This is a test of a paragraph rendered by Contentz.
      </Blockquote>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(getByText(/This is a test of a paragraph rendered by Contentz/))
      .toHaveTextContent("This is a test of a paragraph rendered by Contentz.");
  });

  test("Anchor Internal", () => {
    const { asFragment, getByText } = render(
      <Anchor href="/">Go to home</Anchor>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/Go to home/)).toHaveTextContent("Go to home");
    expect(getByText(/Go to home/)).toHaveAttribute("target", "_self");
    expect(getByText(/Go to home/)).toHaveAttribute("href", "/");
  });

  test("Anchor External", () => {
    const { asFragment, getByText } = render(
      <Anchor href="https://contentz.tech">Contentz.tech</Anchor>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/Contentz.tech/)).toHaveTextContent("Contentz.tech");
    expect(getByText(/Contentz.tech/)).toHaveAttribute("target", "_blank");
    expect(getByText(/Contentz.tech/))
      .toHaveAttribute("rel", "nofollow noopener");
    expect(getByText(/Contentz.tech/))
      .toHaveAttribute("href", "https://contentz.tech");
  });
});
