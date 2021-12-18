import { ICommonSchema } from "./Microcms";

export interface ApiPost extends ICommonSchema {
  id: string;
  title: string;
  slug: string;
  body: string;
  category: ApiCategory;
  tags: ApiTag[];
  publishedAt: string;
}

export interface ApiCategory extends ICommonSchema {
  name: string;
  slug: string;
}

export interface ApiTag extends ICommonSchema {
  name: string;
  slug: string;
}
