import { clsx } from "clsx";

import { PostItem } from "./PostItem/PostItem";

import type { Props } from "./type";
import type { IPostItem } from "@/types/domain/Post";

export const PostList = ({ posts }: Props) => (
  <ul className={clsx("tw-flex tw-flex-col tw-gap-y-10 tw-pl-0")}>
    {posts.map((post: IPostItem) => (
      <li key={post.slug}>
        <PostItem post={post} />
      </li>
    ))}
  </ul>
);
