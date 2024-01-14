import { IPost, IPostItem } from "@/types/domain/Post";

import type { ParsedUrlQuery } from "querystring";

export interface Params extends ParsedUrlQuery {
  slug: string;
}

export type PostProps = {
  post: IPost;
  relatedPosts: IPostItem[];
  draftKey?: string;
};
