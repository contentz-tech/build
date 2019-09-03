declare module "@mdx-js/react" {
  import { ComponentType, StyleHTMLAttributes } from "react";
  type MDXProps = {
    children: React.ReactNode;
    components: { wrapper: React.ReactNode };
  };
  export class MDXProvider extends React.Component<MDXProps> {}
}

declare module "@mdx-js/mdx" {
  export default function mdx(content: string): Promise<string>;
}

declare module "@babel/core" {
  export * from "babel-core";
}

declare module "parse-url" {
  export default function parse(
    url: string,
    normalize?: boolean | object
  ): {
    protocols: string[];
    protocol: string;
    port?: number;
    resource: string;
    user: string;
    pathname: string;
    hash: string;
    search: string;
    href: string;
    query: string;
  };
}

declare module "markdown-toc" {
  export default function getTOC(content: string): { content: string };
}

declare module "get-hrefs" {
  export default function getHrefs(content: string): string[];
}
