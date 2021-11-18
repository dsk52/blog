import React, { VFC } from "react";

import { PageBaseProp, Pager } from "../ui/Pager/Pager";
import { PostList } from "../ui/PostList/PostList";

import type { IPostItem } from "../../types/domain/Post";

type Props = {
  posts: IPostItem[]
} & PageBaseProp

export const ListPage: VFC<Props> = ({ posts, maxPage, pageNum }) => (
  <>
    <PostList posts={posts} />

    <footer>
      <Pager
        basePath={"/post/page"}
        maxPage={maxPage}
        pageNum={pageNum}
      />
    </footer>
  </>
)
