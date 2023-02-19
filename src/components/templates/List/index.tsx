import getConfig from "next/config";

import { Adsense } from "@/components/apps/Adsense/Adsense";
import { PostList } from "@/components/features/post/PostList/PostList";
import { Container } from "@/components/ui/Container/Container";
import { Pager } from "@/components/ui/Pager/Pager";

import type { ListPageProps } from "./type";

const { publicRuntimeConfig } = getConfig();

const {
  NEXT_PUBLIC_ADS_ARTICLE_TOP_SLOT,
  NEXT_PUBLIC_ADSENSE_CLIENT,
  NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT,
} = publicRuntimeConfig;

export const ListPage = ({
  posts,
  maxPage,
  pageNum,
  basePath,
}: ListPageProps) => (
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
        <Pager basePath={basePath} maxPage={maxPage} pageNum={pageNum} />

        <Adsense
          client={NEXT_PUBLIC_ADSENSE_CLIENT}
          slot={NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT}
        />
      </Container>
    </footer>
  </>
);
