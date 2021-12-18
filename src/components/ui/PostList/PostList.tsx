import { IPostItem } from "../../../types/domain/Post";
import { PostItem } from '../PostItem/PostItem';
import s from './PostList.module.css'

import type { Props } from "./type";
import type { VFC } from "react";

export const PostList: VFC<Props> = ({ posts }) => (
  <ul className={s.postList} >
    {posts.map((post: IPostItem) => (
      <li key={post.slug} className={s.postListItem}>
        <PostItem post={post} />
      </li>
    ))}
  </ul>
)
