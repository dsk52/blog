import { clsx } from "clsx";

import type { IPostItem } from "@/types/domain/Post";

import { PostItem } from "./PostItem/PostItem";
import type { Props } from "./type";

export const PostList = ({ posts }: Props) => (
  <ul
    data-testid="post-list"
    className={clsx("tw:flex tw:flex-col tw:gap-y-10 tw:pl-0")}
  >
    {posts.map((post: IPostItem) => (
      <li key={post.slug}>
        <PostItem post={post} />
      </li>
    ))}
  </ul>
);
