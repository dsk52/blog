import { PostItem } from "@/components/features/post/PostList/PostItem/PostItem";

import s from "./style.module.css";

import type { RelatedPostsProps } from "@/components/features/post/RelatedPosts/type";

export const RelatedPosts = ({ posts }: RelatedPostsProps) => (
  <ul className={s.relatedPosts}>
    {posts.map((post) => (
      <li key={post.slug} className={s.relatedPostItem}>
        <PostItem post={post} />
      </li>
    ))}
  </ul>
);
