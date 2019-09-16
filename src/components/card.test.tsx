/** * @jest-environment jsdom */
import '@testing-library/jest-dom/extend-expect'
import { jsx } from "@emotion/core";
import { render } from "@testing-library/react";
import Card from "./card";

describe("Card", () => {
  test("Non Selectable", () => {
    const { asFragment, getByText } = render(
      <Card>This is the content of the card.</Card>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/This is the content of the card/)).toBeInTheDocument();
    expect(getByText(/This is the content of the card/))
      .toHaveStyle("user-select: none");
  });

  test("Selectable", () => {
    const { asFragment, getByText } = render(
      <Card selectable>This is the content of the card.</Card>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/This is the content of the card/)).toBeInTheDocument();
    expect(getByText(/This is the content of the card/))
      .toHaveStyle("user-select: text");
  });
});
