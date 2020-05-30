/* eslint-disable react/react-in-jsx-scope */
import { jsx } from "@emotion/core";
import ui from "./ui";
import { Title, Description, Date } from "./lead";

import Header from "./header";
import Footer from "./footer";
import CanonicalURL from "./canonical";
import * as Translated from "./translated";
import ReadNext from "./read-next";
import { ContentType } from "../definitions";
import { IArticle } from "../getters/articles";
import { IPage } from "../getters/pages";
import Share from "./icons/share";
import { FunctionComponent } from "react";
import Video from "./video";

interface LayoutProps {
  data: IArticle | IPage;
  TOC?: FunctionComponent<{ components: any }>;
  Component: FunctionComponent<{ components: any }>;
}

function TOCWrapper(props: any): JSX.Element {
  return (
    <aside
      {...props}
      css={{
        a: {
          color: "black",
        },
        ul: {
          listStyleType: "none",
          paddingLeft: 0,
          marginLeft: 0,
          ul: {
            listStyleType: "square",
            paddingLeft: "1em",
          },
        },
        "@media (min-width: 1400px)": {
          position: "absolute",
          right: "110%",
          width: "30vw",
          maxWidth: "250px",
        },
      }}
    />
  );
}

function Layout({ data, TOC, Component }: LayoutProps): JSX.Element {
  return (
    <div css={{ position: "relative" }}>
      <Header />
      <section
        css={{
          margin: "0 auto",
          maxWidth: "40em",
          width: "100%",
          position: "relative",
          "@media (max-width: 40em)": {
            fontSize: "0.9em",
            boxSizing: "border-box",
            padding: "0 2em",
          },
        }}
      >
        {data.date && <Date date={data.date} />}
        <Title>{data.title}</Title>
        {data.description && <Description>{data.description}</Description>}
        {TOC && <TOC components={{ ...ui, wrapper: TOCWrapper }} />}
        {data.canonical_url && <CanonicalURL value={data.canonical_url} />}
        {data.type === ContentType.Article && data.translated_from && (
          <Translated.From {...data.translated_from} />
        )}
        {data.type === ContentType.Article && data.translated_to && (
          <Translated.To translations={data.translated_to} />
        )}
        {(data.youtube || data.vimeo) && (
          <Video youtube={data.youtube} vimeo={data.vimeo} />
        )}
        <Component components={ui} />
        {data.type === ContentType.Article && data.next && (
          <ReadNext {...data.next} />
        )}
      </section>
      <Footer repositoryPath={data.repositoryPath}>
        {data.type === ContentType.Article && (
          <button
            css={{
              alignItems: "center",
              border: "none",
              background: "none",
              color: "black",
              display: "inline-flex",
              fontSize: "0.8em",
              padding: 0,
              marginRight: "1em",
            }}
            id="share"
            style={{ display: "none" }}
            data-description={data.description}
          >
            <span css={{ marginRight: ".5em" }}>Share</span>
            <Share />
          </button>
        )}
      </Footer>
      {data.type === ContentType.Article && <script src="/share.js"></script>}
    </div>
  );
}

export default Layout;
