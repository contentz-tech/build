import { Fragment } from "react";
import { jsx } from "@emotion/core";
import parse from "parse-url";

import { Anchor } from "./html/text";
import Card from "./card";
import { useState } from "./state";

function isLocal(url: string): boolean {
  return !parse(url).resource;
}

interface FromProps {
  lang: string;
  path: string;
  title: string;
}

function From(props: FromProps) {
  const state = useState();
  return (
    <Card>
      {state.i18n.translated.from}{" "}
      <Anchor
        href={props.path}
        target={isLocal(props.path) ? "_self" : "_blank"}
        rel="canonical"
      >
        <strong lang={props.lang}>{props.title}</strong>
      </Anchor>
    </Card>
  );
}

interface ToProps {
  translations: {
    lang: string;
    path: string;
  }[];
}

function To(props: ToProps) {
  const state = useState();

  return (
    <Card>
      {state.i18n.translated.to}
      {props.translations.map(({ path, lang }, index, { length }) => {
        const language = state.i18n.languages[lang];
        
        if (!language) return null;
        
        const content = (
          <Anchor
            key={lang}
            href={path}
            target={isLocal(path) ? "_self" : "_blank"}
            rel="canonical"
          >
            {language.nativeName}
          </Anchor>
        );

        if (index === 0) return content;
        
        if (index === length - 1)
          return (
            <Fragment key={lang}>
              {state.i18n.translated.lastSeparator}
              {content}
            </Fragment>
          );
        
          return (
          <Fragment key={lang}>
            {state.i18n.translated.separator}
            {content}
          </Fragment>
        );
      })}
    </Card>
  );
}

export { From, To };
