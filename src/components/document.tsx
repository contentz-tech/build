import { Fragment } from "react";
import { jsx } from "@emotion/core";
import { join } from "path";
import { useState } from "./state";
import { IPage } from "../getters/pages";
import { ISlide } from "../getters/slides";
import { IArticle } from "../getters/articles";

function formatURL(domain: string, path: string): string {
  if (!path) return domain;
  const isCustomPage = path.includes("/pages");
  return `${domain}/${path.slice(
    isCustomPage ? path.indexOf("/pages") + 7 : 1,
    path.indexOf(".mdx")
  )}/`;
}

function formatOGURL(path: string, domain?: string): string {
  if (domain) return domain + formatOGURL(path);
  if (path.endsWith("/")) {
    return join("/static/_social", path).replace(/.$/, ".png");
  } else {
    return join("/static/_social", path).replace(".mdx", ".png");
  }
}

interface BaseProps {
  data?: IPage | ISlide | IArticle;
  links?: string[],
  path: string;
}

interface ChildrenProps extends BaseProps {
  children: JSX.Element[] | JSX.Element;
  content?: null;
}

interface ContentProps extends BaseProps {
  children?: null;
  content: string;
}

type DocumentProps = ChildrenProps | ContentProps;

function Document(props: DocumentProps) {
  const state = useState();

  return (
    <html lang={state.config.language}>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <title>
          {props.data && props.data.title
            ? `${props.data.title} - ${state.config.title}`
            : state.config.title}
        </title>
        <link rel="icon" href={state.config.icon || "/static/favicon.png"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={
            (props.data && props.data.description) || state.config.description
          }
        />
        <meta
          name="language"
          content={(props.data && props.data.lang) || state.config.language}
        />
        <meta name="author" content={state.config.title} />
        <meta name="pagename" content={state.config.title} />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        {props.data ? (
          props.data.published && <meta name="robots" content="index, follow" />
        ) : (
          <meta name="robots" content="index, follow" />
        )}
        <meta name="theme-color" content="black" />
        <meta name="apple-mobile-web-app-title" content={state.config.title} />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        {state.config.domain && (
          <link
            href="/atom.xml"
            type="application/atom+xml"
            rel="alternate"
            title={state.config.title}
          />
        )}
        {props.data && props.data.canonical_url && (
          <link rel="canonical" href={props.data.canonical_url} />
        )}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={(props.data && props.data.title) || state.config.title}
        />
        <meta
          property="og:description"
          content={
            (props.data && props.data.description) || state.config.description
          }
        />
        <meta
          property="og:image"
          content={(props.data && props.data.social) || formatOGURL(props.path)}
        />
        <meta
          property="og:image:alt"
          content={
            (props.data && props.data.description) || state.config.description
          }
        />
        {state.config.domain && (
          <meta
            property="og:url"
            content={formatURL(state.config.domain, props.path)}
          />
        )}
        <meta property="og:site_name" content={state.config.title} />
        <meta
          property="og:locale"
          content={
            (props.data && props.data.lang) || state.config.language || "en"
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        {state.config.social && state.config.social.twitter && (
          <meta
            name="twitter:site"
            content={`@${state.config.social.twitter}`}
          />
        )}
        {state.config.social && state.config.social.twitter && (
          <meta
            name="twitter:creator"
            content={`@${state.config.social.twitter}`}
          />
        )}
        {state.config.domain && (
          <meta
            name="twitter:url"
            content={formatURL(state.config.domain, props.path)}
          />
        )}
        <meta
          name="twitter:title"
          content={(props.data && props.data.title) || state.config.title}
        />
        <meta
          name="twitter:description"
          content={
            (props.data && props.data.description) || state.config.description
          }
        />
        <meta
          name="twitter:image"
          content={
            (props.data && props.data.social) ||
            formatOGURL(props.path, state.config.domain)
          }
        />
        <meta name="twitter:summary" content={state.config.description} />
        <link rel="prefetch" href="/" />
        {state.articles.order.length > 0 && (
          <link rel="prefetch" href="/articles/" />
        )}
        {state.links.length > 0 && <link rel="prefetch" href="/links/" />}
        {state.slides.order.length > 0 && (
          <link rel="prefetch" href="/slides/" />
        )}
        {state.articles.order
          .concat(
            (props.links || []),
            state.pages.order,
            state.slides.order,
            (state.config.navigation || [])
              .map(({ path }) => (path.endsWith("/") ? path : `${path}/`))
              .filter(path => path.startsWith("/"))
          )
          .map((link: string) => (
            <link rel="prefetch" href={link} key={link} />
          ))}
      </head>
      <body
        css={{
          background: "white",
          color: "black",
          margin: 0,
          fontSize: "18px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        }}
      >
        {props.children ? (
          <main>{props.children}</main>
        ) : (
          <main dangerouslySetInnerHTML={{ __html: props.content }} />
        )}
        {state.config.analytics && (
          <Fragment>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${state.config.analytics}`}
            />
            <script src="/load-analytics.js" />
          </Fragment>
        )}
        {state.config.sw && <script src="/load-sw.js" />}
      </body>
    </html>
  );
}

export default Document;
