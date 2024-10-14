import type { ParsedUrlQuery } from "querystring";

import { IPost, IPostItem } from "@/types/domain/Post";

export interface Params extends ParsedUrlQuery {
  slug: string;
}

export type PostProps = {
  post: IPost;
  relatedPosts: IPostItem[];
  draftKey?: string;
};
