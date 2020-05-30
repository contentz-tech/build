/* eslint-disable react/react-in-jsx-scope */
import { jsx } from "@emotion/core";
import Card from "./card";

function formatYoutube(id: string | undefined): string {
  return `https://www.youtube.com/embed/${id}`;
}

function formatVimeo(id: string | undefined): string {
  return `https://player.vimeo.com/video/${id}`;
}

interface VideoProps {
  youtube: string | undefined;
  vimeo: string | undefined;
  caption?: string;
}

function Video({ youtube, vimeo, caption }: VideoProps): JSX.Element {
  return (
    <Card>
      <div
        css={{
          margin: "1em 0",
          position: "relative",
          paddingBottom: "56.25%;",
          paddingTop: "25px",
          height: 0,
          marginBottom: caption ? "0.5em" : 0,
        }}
      >
        <iframe
          src={youtube ? formatYoutube(youtube) : formatVimeo(vimeo)}
          title={caption || youtube ? "YouTube Video" : "Video"}
          css={{
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <p
        css={{
          textAlign: "center",
          marginBottom: 0,
          fontSize: "0.8em",
          color: "rgba(0, 0, 0, 0.7)",
        }}
      >
        {caption}
      </p>
    </Card>
  );
}

export default Video;
