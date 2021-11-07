import { PostItem } from '../PostItem/PostItem';
import s from './PostList.module.css'

import type { IPost } from '../../../types/domain/Post';
import type { VFC } from "react";


type Props = {
  posts: IPost[]
}

export const PostList: VFC<Props> = ({ posts }) => (
  <ul className={s.postList} >
    {posts.map((post: IPost) => (
      <li key={post.id} className={s.postListItem}>
        <PostItem post={post} />
      </li>
    ))}
  </ul>
)
