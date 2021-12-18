import React, { VFC } from "react";

import { envVar } from '../../constants/environment';
import { Adsense } from "../Adsense/Adsense";
import { Pager } from "../ui/Pager/Pager";
import { PostList } from "../ui/PostList/PostList";

import type { IPostItem } from "../../types/domain/Post";
import type { PageBaseProp } from "../ui/Pager/type";


type Props = {
  posts: IPostItem[]
} & PageBaseProp

export const ListPage: VFC<Props> = ({ posts, maxPage, pageNum }) => (
  <>
    <Adsense
      client={envVar.NEXT_PUBLIC_ADSENSE_CLIENT}
      slot={envVar.NEXT_PUBLIC_ADS_ARTICLE_TOP_SLOT}
    />

    <PostList posts={posts} />

    <footer>
      <Pager
        basePath={"/post/page"}
        maxPage={maxPage}
        pageNum={pageNum}
      />

      <Adsense
        client={envVar.NEXT_PUBLIC_ADSENSE_CLIENT}
        slot={envVar.NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT}
      />
    </footer>
  </>
)
