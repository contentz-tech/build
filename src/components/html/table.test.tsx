/** * @jest-environment jsdom */
import '@testing-library/jest-dom/extend-expect'
import { jsx } from "@emotion/core";
import { render } from "@testing-library/react";
import { Table, TH, TR, TD } from "./table";

describe("Table", () => {
  test("Table without Header", () => {
    const { asFragment } = render(
      <Table>
        <tbody>
          <TR>
            <TD>Sergio</TD>
            <TD>Xalambrí</TD>
          </TR>
        </tbody>
      </Table>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("Table with Header", () => {
    const { asFragment } = render(
      <Table>
        <thead>
          <TR>
            <TH>First name</TH>
            <TH>Last name</TH>
          </TR>
        </thead>
        <tbody>
          <TR>
            <TD>Sergio</TD>
            <TD>Xalambrí</TD>
          </TR>
        </tbody>
      </Table>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
