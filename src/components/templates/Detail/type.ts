import type { IPost } from "../../../types/domain/Post";

export type DetailProps = {
  path: string;
} & PostProps;

export type PostProps = {
  post: IPost;
  draftKey?: string;
};
