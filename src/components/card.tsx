import { jsx } from "@emotion/core";

interface CardProps {
  selectable?: boolean;
  children: JSX.Element[] | JSX.Element;
}

function Card({ selectable = false, children }: CardProps) {
  return (
    <div
      css={{
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 5px 0px",
        backgroundColor: "white",
        borderRadius: "5px",
        transition: "all 0.2s ease 0s",
        userSelect: selectable ? "text" : "none",
        margin: "1.5em -2em 3em",
        padding: "1em 2em",
        "@media (max-width: 720px)": {
          boxShadow: "none",
          borderRadius: 0,
          margin: 0,
          padding: "1em 0.5em"
        }
      }}
    >
      {children}
    </div>
  );
}

export default Card;
