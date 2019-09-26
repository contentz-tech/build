/** * @jest-environment jsdom */
import '@testing-library/jest-dom/extend-expect'
import { jsx } from "@emotion/core";
import { render } from "@testing-library/react";
import { Code, Pre } from "./code";

const code = `function loadLocale(locale: string = "en-US"): any {
  try {
    const module = require(\`date-fns/locale/$\{locale}/index.js\`);
    if (module.default) return module.default;
    return module;
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND" && locale !== "en-US") {
      return loadLocale();
    }
    throw error;
  }
}

export { loadLocale };
`;

describe("Code", () => {
  test("Code", () => {
    const { asFragment } = render(<Code>{code}</Code>)
    expect(asFragment()).toMatchSnapshot();
  });

  test("Pre", () => {
    const { asFragment } = render(<Pre><Code>{code}</Code></Pre>)
    expect(asFragment()).toMatchSnapshot();
  });
});
