import { datetimeToDate } from '../../../utilities/Date';
import s from './PostItem.module.css'

import type { IPost } from '../../../types/domain/Post';
import type { VFC } from "react";


type Props = {
  post: IPost
}

export const PostItem: VFC<Props> = ({ post }) => {
  const pubDate = datetimeToDate(post.publishedAt)

  return (
    <>
      <div className={s.title}>
        {post.title}
      </div>
      <div className={s.meta}>
        <div className={s.category}>{post.category.name}</div>
        <time className={s.date}>{pubDate}</time>
      </div>
    </>
  )
}
