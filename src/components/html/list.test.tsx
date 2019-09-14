/** * @jest-environment jsdom */
import '@testing-library/jest-dom/extend-expect'
import { jsx } from "@emotion/core";
import { render } from "@testing-library/react";
import { UL, OL, LI } from "./list";

describe("List", () => {
  test("Ordered", () => {
    const { asFragment, getByText } = render(
      <OL>
        <LI>Item 1</LI>
        <LI>Item 2</LI>
        <LI>Item 3</LI>
      </OL>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(getByText(/Item 1/)).toHaveTextContent("Item 1");
    expect(getByText(/Item 2/)).toHaveTextContent("Item 2");
    expect(getByText(/Item 3/)).toHaveTextContent("Item 3");
  });

  test("Unordered", () => {
    const { asFragment, getByText } = render(
      <UL>
        <LI>Item 1</LI>
        <LI>Item 2</LI>
        <LI>Item 3</LI>
      </UL>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(getByText(/Item 1/)).toHaveTextContent("Item 1");
    expect(getByText(/Item 2/)).toHaveTextContent("Item 2");
    expect(getByText(/Item 3/)).toHaveTextContent("Item 3");
  });
});
