import { Fragment } from "react";
import { jsx } from "@emotion/core";
import { IState } from "../state";
import { useState } from "./state";

import { Title, Description } from "./lead";
import Header from "./header";
import Patreon from "./patreon";

import Twitter from "./icons/twitter";
import Meetup from "./icons/meetup";
import NPM from "./icons/npm";
import GitHub from "./icons/github";
import Dev from "./icons/dev";
import LinkedIn from "./icons/linkedin";
import Email from "./icons/email";

interface IFormatURL {
  name: string;
  value: string | number;
}

interface IFormatURLResult {
  icon: React.FunctionComponent;
  link: string;
}

function formatURL({ name, value }: IFormatURL): IFormatURLResult {
  switch (name.toLowerCase()) {
    case "twitter":
      return { icon: Twitter, link: `https://twitter.com/${value}` };
    case "meetup":
      return {
        icon: Meetup,
        link: `https://www.meetup.com/members/${value.toString()}/`
      };
    case "npm":
      return { icon: NPM, link: `https://www.npmjs.com/~${value}` };
    case "github":
      return { icon: GitHub, link: `https://github.com/${value}` };
    case "dev":
      return { icon: Dev, link: `https://dev.to/${value}` };
    case "linkedin":
      return { icon: LinkedIn, link: `https://www.linkedin.com/in/${value}/` };
    default:
      throw new Error(`Invalid social network name ${name}.`);
  }
}

function Icon(props: { children: JSX.Element[] | JSX.Element }) {
  return (
    <i
      children={props.children}
      css={{
        svg: {
          width: 32,
          height: 32,
          fill: "black",
          "@media (max-width: 1000px) and (orientation: portrait)": {
            width: "20px",
            height: "20px"
          }
        }
      }}
    />
  );
}

function HomePage() {
  const state: IState = useState();
  return (
    <Fragment>
      <Header />
      <section
        css={{
          boxSizing: "border-box",
          fontSize: "1.25em",
          minHeight: "calc(90vh - 58px)",
          margin: "10vh auto 0",
          maxWidth: "1000px",
          padding: "0 10vw 0",
          "@media (max-width: 1000px)": {
            fontSize: "1em"
          },
          "@media (max-width: 1000px) and (orientation: landscape)": {
            marginBottom: "10vh"
          }
        }}
      >
        <Title>{state.config.title}</Title>
        <Description>{state.config.description}</Description>
        <div>
          {state.config.social &&
            Object.entries(state.config.social).map(([name, value]) => (
              <a
                key={name}
                href={formatURL({ name, value }).link}
                title={name}
                rel="me"
                css={{
                  display: "inline-flex",
                  color: "black",
                  textDecoration: "none",
                  margin: "0 .5em",
                  ":first-of-type": {
                    marginLeft: 0
                  },
                  ":last-of-type": {
                    marginRight: 0
                  }
                }}
              >
                <Icon>{jsx(formatURL({ name, value }).icon)}</Icon>
              </a>
            ))}
          {state.config.email && (
            <a
              href={`mailto:${state.config.email}`}
              rel="me"
              css={{
                display: "inline-flex",
                color: "black",
                textDecoration: "none",
                margin: "0 .5em",
                ":first-of-type": {
                  marginLeft: 0
                },
                ":last-of-type": {
                  marginRight: 0
                }
              }}
            >
              <Icon>
                <Email />
              </Icon>
            </a>
          )}
        </div>
        {state.config.patreon && (
          <Fragment>
            <br />
            <Patreon />
          </Fragment>
        )}
      </section>
    </Fragment>
  );
}

export default HomePage;
