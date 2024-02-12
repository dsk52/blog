import { clsx } from "clsx";

import { PostItem } from "@/components/features/post/PostList/PostItem/PostItem";

import type { RelatedPostsProps } from "./type";

export const RelatedPosts = ({ posts }: RelatedPostsProps) => (
  <ul
    className={clsx(
      "tw-flex tw-flex-col tw-gap-y-8 tw-list-none tw-pl-0 tw-mt-7",
    )}
  >
    {posts.map((post) => (
      <li key={post.slug}>
        <PostItem post={post} />
      </li>
    ))}
  </ul>
);
