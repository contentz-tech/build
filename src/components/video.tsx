import { jsx } from "@emotion/core";
import Card from "./card";

function format(id: string): string {
  return `https://www.youtube.com/embed/${id}`;
}

interface VideoProps {
  youtube: string;
  src?: string;
  caption?: string;
}

function Video({ youtube, src = format(youtube), caption }: VideoProps) {
  return (
    <Card>
      <div
        css={{
          margin: "1em 0",
          position: "relative",
          paddingBottom: "56.25%;",
          paddingTop: "25px",
          height: 0,
          marginBottom: caption ? "0.5em" : 0
        }}
      >
        <iframe
          src={src}
          title={caption || youtube ? "YouTube Video" : "Videp"}
          css={{
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        />
      </div>
      <p
        css={{
          textAlign: "center",
          marginBottom: 0,
          fontSize: "0.8em",
          color: "rgba(0, 0, 0, 0.7)"
        }}
      >
        {caption}
      </p>
    </Card>
  );
}

export default Video;
