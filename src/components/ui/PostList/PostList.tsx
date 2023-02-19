import { PostItem } from "./PostItem/PostItem";
import s from "./PostList.module.css";

import type { Props } from "./type";
import type { IPostItem } from "@/types/domain/Post";

export const PostList = ({ posts }: Props) => (
  <ul className={s.postList}>
    {posts.map((post: IPostItem) => (
      <li key={post.slug} className={s.postListItem}>
        <PostItem post={post} />
      </li>
    ))}
  </ul>
);
