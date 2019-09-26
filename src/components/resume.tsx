import { jsx } from "@emotion/core";
import { Fragment } from "react";
import Header from "./header";
import { useState } from "./state";
import { IState } from "../state";
import ui from "./ui";
import { Basics, Work, Volunteer, Language } from "../getters/resume";
import format from "date-fns/format";

enum SpaceSize {
  Small = "small",
  Medium = "medium"
}

function Space({ size = SpaceSize.Medium }: { size?: SpaceSize }) {
  return (
    <div
      css={{
        display: "inline-block",
        width: size === SpaceSize.Small ? "1rem" : "2rem"
      }}
    />
  );
}

function Basics(props: Basics) {
  return (
    <section id="basics" css={{ marginBottom: "3rem" }}>
      {props.name && <ui.h1 css={{ marginBottom: 0 }}>{props.name}</ui.h1>}
      <div>
        {props.email && (
          <ui.a href={props.email} title="Email address">
            {props.email}
          </ui.a>
        )}
        <Space />
        {props.phone && (
          <ui.a href={`tel:${props.phone}`} title="Phone number">
            {props.phone}
          </ui.a>
        )}
        <Space />
        {props.website && (
          <ui.a href={props.website} title="Personal website">
            {props.website}
          </ui.a>
        )}
      </div>
      {props.summary && <ui.blockquote>{props.summary}</ui.blockquote>}
      {props.profiles && (
        <div css={{ display: "flex", flexWrap: "wrap" }}>
          {props.profiles.map(profile => (
            <Fragment key={profile.network}>
              <div css={{ display: "flex", padding: ".5em 0" }}>
                <strong>{profile.network}</strong>
                <Space size={SpaceSize.Small} />
                <ui.a href={profile.url} title={profile.network}>
                  @{profile.username}
                </ui.a>
              </div>
              <Space />
            </Fragment>
          ))}
        </div>
      )}
    </section>
  );
}

function WorkExperience(props: { experiencies: Work[] }) {
  if (props.experiencies.length === 0) return null;

  return (
    <section id="work" css={{ marginBottom: "3rem" }}>
      <ui.h3>Experience</ui.h3>
      {props.experiencies.map(experience => (
        <article key={JSON.stringify(experience)}>
          <ui.h4>{experience.company}</ui.h4>
          <div>
            <strong css={{ fontWeight: 500 }}>{experience.position}</strong>
            <Space />
            {experience.startDate ? (
              experience.endDate ? (
                <em
                  css={{
                    fontSize: "0.9em",
                    fontStyle: "normal",
                    fontWeight: "lighter"
                  }}
                >
                  {format(new Date(experience.startDate), "MMM yyyy")}
                  {" - "}
                  {format(new Date(experience.endDate), "MMM yyyy")}
                </em>
              ) : (
                <em
                  css={{
                    fontSize: "0.9em",
                    fontStyle: "normal",
                    fontWeight: "lighter"
                  }}
                >
                  {format(new Date(experience.startDate), "MMM yyyy")} - Current
                </em>
              )
            ) : null}
          </div>
          {experience.summary && <ui.p>{experience.summary}</ui.p>}
          {experience.highlights && (
            <ui.ul>
              {experience.highlights.map(highlight => (
                <ui.li key={highlight}>{highlight}</ui.li>
              ))}
            </ui.ul>
          )}
        </article>
      ))}
    </section>
  );
}

function VolunteerExperience(props: { experiencies: Volunteer[] }) {
  if (props.experiencies.length === 0) return null;

  return (
    <section id="volunteer" css={{ marginBottom: "3rem" }}>
      <ui.h3>Volunteering</ui.h3>
      {props.experiencies.map(experience => (
        <article key={JSON.stringify(experience)}>
          <ui.h4>{experience.organization}</ui.h4>
          <div>
            <strong css={{ fontWeight: 500 }}>{experience.position}</strong>
            <Space />
            {experience.startDate ? (
              experience.endDate ? (
                <em
                  css={{
                    fontSize: "0.9em",
                    fontStyle: "normal",
                    fontWeight: "lighter"
                  }}
                >
                  {format(new Date(experience.startDate), "MMM yyyy")}
                  {" - "}
                  {format(new Date(experience.endDate), "MMM yyyy")}
                </em>
              ) : (
                <em
                  css={{
                    fontSize: "0.9em",
                    fontStyle: "normal",
                    fontWeight: "lighter"
                  }}
                >
                  {format(new Date(experience.startDate), "MMM yyyy")} - Current
                </em>
              )
            ) : null}
          </div>
          {experience.summary && <ui.p>{experience.summary}</ui.p>}
          {experience.highlights && (
            <ui.ul>
              {experience.highlights.map(highlight => (
                <ui.li key={highlight}>{highlight}</ui.li>
              ))}
            </ui.ul>
          )}
        </article>
      ))}
    </section>
  );
}

function Languages(props: { languages: Language[] }) {
  if (props.languages.length === 0) return null;

  return (
    <section id="languages" css={{ marginBottom: "3rem" }}>
      <ui.h3>Languages</ui.h3>
      <section>
        {props.languages.map(language => (
          <article key={language.language}>
            <ui.h6>
              {language.language}{" "}
              <small css={{ fontWeight: "lighter", fontSize: "0.8em" }}>
                ({language.fluency})
              </small>
            </ui.h6>
          </article>
        ))}
      </section>
    </section>
  );
}

function ResumePage() {
  const state: IState = useState();

  if (!state.resume) return null;

  return (
    <Fragment>
      <Header />
      <section
        css={{
          margin: "0 auto",
          maxWidth: "50em",
          "@media (max-width: 50em)": {
            boxSizing: "border-box",
            padding: "0 1.5em"
          }
        }}
      >
        <Basics {...state.resume.basics} />
        {state.resume.work && (
          <WorkExperience experiencies={state.resume.work} />
        )}
        {state.resume.volunteer && (
          <VolunteerExperience experiencies={state.resume.volunteer} />
        )}
        {state.resume.languages && (
          <Languages languages={state.resume.languages} />
        )}
      </section>
    </Fragment>
  );
}

export default ResumePage;
