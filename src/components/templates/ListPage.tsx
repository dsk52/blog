import React, { VFC } from "react";

import { Pager } from "../Pager/Pager";
import { PostList } from "../ui/PostList/PostList";

import type { IPostItem } from "../../types/domain/Post";

type Props = {
  posts: IPostItem[],
  maxPage: number,
  pageNum: number
}

export const ListPage: VFC<Props> = (props) => (
  <>
    <PostList posts={props.posts}></PostList>

    <footer>
      <div className="pager-wrapper">
        {props.pageNum !== 1 ? (
          <Pager
            label="前のページへ"
            url={`/post/page/${props.pageNum - 1}`}
          />
        ) : null}

        {props.pageNum !== props.maxPage ? (
          <Pager
            label="次のページへ"
            url={`/post/page/${props.pageNum + 1}`}
          />
        ) : null}
      </div>
    </footer>
  </>
)
