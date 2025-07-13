import type { ParsedUrlQuery } from "querystring";

import type { IPost, IPostItem } from "@/types/domain/Post";

export interface Params extends ParsedUrlQuery {
  slug: string;
}

export type PostProps = {
  post: IPost;
  relatedPosts: IPostItem[];
  draftKey?: string;
};
