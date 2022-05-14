import getConfig from 'next/config';
import React from "react";

import { Adsense } from "../../Adsense/Adsense";
import { Container } from '../../Container/index';
import { Pager } from "../../ui/Pager/Pager";
import { PostList } from "../../ui/PostList/PostList";

import type { IPostItem } from "../../../types/domain/Post";
import type { PageBaseProp } from "../../ui/Pager/type";


type Props = {
  posts: IPostItem[]
  basePath: string
} & PageBaseProp

const { publicRuntimeConfig } = getConfig()

const {
  NEXT_PUBLIC_ADS_ARTICLE_TOP_SLOT,
  NEXT_PUBLIC_ADSENSE_CLIENT,
  NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT
} = publicRuntimeConfig

export const ListPage = ({ posts, maxPage, pageNum, basePath }: Props) => (
  <>
    <Container>
      <Adsense
        client={NEXT_PUBLIC_ADSENSE_CLIENT}
        slot={NEXT_PUBLIC_ADS_ARTICLE_TOP_SLOT}
      />
    </Container>

    <Container>
      <PostList posts={posts} />
    </Container>

    <footer>
      <Container>
        <Pager
          basePath={basePath}
          maxPage={maxPage}
          pageNum={pageNum}
        />

        <Adsense
          client={NEXT_PUBLIC_ADSENSE_CLIENT}
          slot={NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT}
        />
      </Container>
    </footer>
  </>
)
