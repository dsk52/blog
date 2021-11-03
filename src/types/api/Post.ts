import { ICommonSchema } from "../Microcms";

export interface ApiPost extends ICommonSchema {
  id: string;
  title: string;
  body: string;
  slug: string;
  category: ApiCategory;
  tags: ApiTag[];
  publishedAt: string;
  updatedAt: string;
}

export interface ApiCategory extends ICommonSchema {
  name: string;
  slug: string;
}

export interface ApiTag extends ICommonSchema {
  name: string;
  slug: string;
}
