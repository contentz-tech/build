import { IPath } from "./utils/parse-path";

export interface IContent extends IPath {
  type: ContentType;
  title?: string;
  description?: string;
  date?: Date;
  lang?: string;
  content: string;
  canonical_url?: string;
  published?: boolean;
  social?: string;
  youtube?: string;
  vimeo?: string;
}

export enum ContentType {
  Article = "article",
  Slide = "slide",
  Page = "page",
}
