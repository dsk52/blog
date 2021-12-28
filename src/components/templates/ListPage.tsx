import getConfig from 'next/config';
import React, { VFC } from "react";

import { Adsense } from "../Adsense/Adsense";
import { Pager } from "../ui/Pager/Pager";
import { PostList } from "../ui/PostList/PostList";

import type { IPostItem } from "../../types/domain/Post";
import type { PageBaseProp } from "../ui/Pager/type";


type Props = {
  posts: IPostItem[]
} & PageBaseProp

const { publicRuntimeConfig } = getConfig()

const {
  NEXT_PUBLIC_ADS_ARTICLE_TOP_SLOT,
  NEXT_PUBLIC_ADSENSE_CLIENT,
  NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT
} = publicRuntimeConfig

export const ListPage: VFC<Props> = ({ posts, maxPage, pageNum }) => (
  <>
    <Adsense
      client={NEXT_PUBLIC_ADSENSE_CLIENT}
      slot={NEXT_PUBLIC_ADS_ARTICLE_TOP_SLOT}
    />

    <PostList posts={posts} />

    <footer>
      <Pager
        basePath={"/post/page"}
        maxPage={maxPage}
        pageNum={pageNum}
      />

      <Adsense
        client={NEXT_PUBLIC_ADSENSE_CLIENT}
        slot={NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT}
      />
    </footer>
  </>
)
