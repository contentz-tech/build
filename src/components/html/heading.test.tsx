/** * @jest-environment jsdom */
import "@testing-library/jest-dom/extend-expect";
import { jsx } from "@emotion/core";
import { render } from "@testing-library/react";
import { H1, H2, H3, H4, H5, H6 } from "./heading";

describe("Heading", () => {
  test("Level 1", () => {
    const { asFragment, getByText } = render(<H1>Heading 1</H1>);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/Heading 1/)).toBeInTheDocument();
  });

  test("Level 2", () => {
    const { asFragment, getByText } = render(<H2>Heading 2</H2>);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/Heading 2/)).toBeInTheDocument();
  });

  test("Level 3", () => {
    const { asFragment, getByText } = render(<H3>Heading 3</H3>);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/Heading 3/)).toBeInTheDocument();
  });

  test("Level 4", () => {
    const { asFragment, getByText } = render(<H4>Heading 4</H4>);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/Heading 4/)).toBeInTheDocument();
  });

  test("Level 5", () => {
    const { asFragment, getByText } = render(<H5>Heading 5</H5>);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/Heading 5/)).toBeInTheDocument();
  });

  test("Level 6", () => {
    const { asFragment, getByText } = render(<H6>Heading 6</H6>);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/Heading 6/)).toBeInTheDocument();
  });
});
