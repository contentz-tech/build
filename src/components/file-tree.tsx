import { jsx } from "@emotion/core";
import { Code } from "./html/code";
import Card from "./card";

import FolderIcon from "./icons/folder";
import FileIcon from "./icons/file";

enum Type {
  Folder = "folder",
  Directory = "directory",
  File = "file"
}

interface Element {
  name: string;
}

interface File extends Element {
  type: Type.File;
}

interface Folder extends Element {
  type: Type.Folder | Type.Directory;
  children: Child[];
}

type Child = File | Folder;

function sortByName(a: Child, b: Child) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function sortByType(a: Child, b: Child) {
  if (
    (a.type === Type.File || a.type === Type.Directory) &&
    b.type === Type.Folder
  ) {
    return -1;
  }

  if (
    a.type === Type.Folder &&
    (b.type === Type.File || b.type === Type.Directory)
  ) {
    return 1;
  }

  return 0;
}

function mapChildren(children: Child[], level: number = 0) {
  return children
    .sort(sortByName)
    .sort(sortByType)
    .map(item => {
      if (item.type === Type.File) {
        return <File level={level} key={item.name + item.type} {...item} />;
      }
      if (item.type === Type.Directory || item.type === Type.Folder) {
        return <Folder level={level} key={item.name + item.type} {...item} />;
      }
      return null;
    });
}

function calcIndents(level: number): JSX.Element[] {
  return Array.from({ length: level }, (_, index) => <Indent key={index} />);
}

function Name(props: { children: string }) {
  return <span css={{ fontSize: "0.9em" }}>{props.children}</span>;
}

function Indent() {
  return (
    <span
      css={{
        display: "inline-block",
        width: "30px",
        height: "35px",
        lineHeight: "35px",
        backgroundImage:
          "linear-gradient(to right, transparent 11px, rgb(234, 234, 234) 11px, rgb(234, 234, 234) 12px, transparent 12px)",
        verticalAlign: "top",
        backgroundRepeat: "no-repeat"
      }}
    />
  );
}

function Icon({ kind }: { kind: Type }) {
  return (
    <i css={{ marginRight: "0.25em", display: "inline-flex" }}>
      {kind === Type.File ? <FileIcon /> : <FolderIcon />}
    </i>
  );
}

interface FileProps extends File {
  level: number;
}

function File(props: FileProps) {
  return (
    <li css={{ display: "flex", alignItems: "center" }}>
      {calcIndents(props.level)}
      <div
        css={{
          height: "30px",
          display: "flex",
          alignItems: "center",
          ":hover": { fontWeight: "bold" }
        }}
      >
        <Icon kind={props.type} />
        <Name>{props.name}</Name>
      </div>
    </li>
  );
}

interface FolderProps extends Folder {
  level: number;
  close?: boolean;
}

function Folder(props: FolderProps) {
  return (
    <li>
      <details open={!props.close}>
        <summary
          css={{
            display: "flex",
            alignItems: "center",
            outline: "none",
            ":hover": { fontWeight: "bold", cursor: "pointer" },
            "::-webkit-details-marker": { display: "none" }
          }}
        >
          {calcIndents(props.level)}
          <Icon kind={props.type} />
          <Name>{props.name}</Name>
        </summary>
        <ul css={{ listStyleType: "none", paddingLeft: 0 }}>
          {mapChildren(props.children, props.level + 1)}
        </ul>
      </details>
    </li>
  );
}

interface FileTreeProps {
  children: string | JSX.Element | JSX.Element[];
}

function FileTree(props: FileTreeProps) {
  if (typeof props.children !== "string") {
    return <Code {...props} />;
  }
  return (
    <Card>
      <ul css={{ listStyleType: "none", paddingLeft: 0 }}>
        {mapChildren(JSON.parse(props.children), 0)}
      </ul>
    </Card>
  );
}

export default FileTree;
