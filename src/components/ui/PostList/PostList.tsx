import { PostItem } from '../PostItem/PostItem';
import s from './PostList.module.css'

import type { IPostItem } from '../../../types/domain/Post';
import type { VFC } from "react";


type Props = {
  posts: IPostItem[]
}

export const PostList: VFC<Props> = ({ posts }) => (
  <ul className={s.postList} >
    {posts.map((post: IPostItem) => (
      <li key={post.slug} className={s.postListItem}>
        <PostItem post={post} />
      </li>
    ))}
  </ul>
)
