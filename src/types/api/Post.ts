import { MicroCMSImage } from "microcms-js-sdk";

import type { ICommonSchema } from "./Microcms";

export interface ApiPost extends ICommonSchema {
  title: string;
  slug: string;
  body: string;
  category: ApiCategory;
  tags: ApiTag[];
  thumbnail?: MicroCMSImage
}

export interface ApiCategory extends ICommonSchema {
  name: string;
  slug: string;
}

export interface ApiTag extends ICommonSchema {
  name: string;
  slug: string;
}
