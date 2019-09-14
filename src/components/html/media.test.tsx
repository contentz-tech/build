/** * @jest-environment jsdom */
import '@testing-library/jest-dom/extend-expect'
import { jsx } from "@emotion/core";
import { render } from "@testing-library/react";
import { Image } from "./media";

describe("Media", () => {
  test("Image without Figure", () => {
    const { asFragment, getByAltText } = render(
      <Image src="/static/avatar.png" alt="User avatar" />
    );

    expect(asFragment()).toMatchSnapshot();
    expect(getByAltText(/User avatar/)).toBeInTheDocument();
    expect(getByAltText(/User avatar/)).toHaveAttribute("loading", "lazy");
    expect(getByAltText(/User avatar/)).toHaveAttribute("loading", "lazy");
    expect(getByAltText(/User avatar/))
      .toHaveAttribute("src", "/static/avatar.png");
  });

  test("Image with Figure", () => {
    const { asFragment, getByAltText, getByText } = render(
      <Image src="/static/avatar.png" title="My Avatar" alt="User avatar" />
    );

    expect(asFragment()).toMatchSnapshot();
    expect(getByAltText(/User avatar/)).toBeInTheDocument();
    expect(getByAltText(/User avatar/)).toHaveAttribute("loading", "lazy");
    expect(getByAltText(/User avatar/))
      .toHaveAttribute("src", "/static/avatar.png");
    expect(getByText(/My Avatar/)).toBeInTheDocument();
    expect(getByText(/My Avatar/)).toHaveTextContent("My Avatar");
  });
});
