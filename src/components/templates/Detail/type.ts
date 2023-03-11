import type { IPost, IPostItem } from "../../../types/domain/Post";

export type DetailProps = {
  path: string;
} & PostProps;

export type PostProps = {
  post: IPost;
  relatedPosts: IPostItem[];
  draftKey?: string;
};
