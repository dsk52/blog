import { Adsense } from "@/components/apps/Adsense/Adsense";
import { PostList } from "@/components/features/post/PostList/PostList";
import { Container } from "@/components/ui/Container/Container";
import { Pager } from "@/components/ui/Pager/Pager";
import { AdsenseClient, AdsenseUnits } from "@/constants/google";

import type { ListPageProps } from "./type";

export const ListPage = ({
  posts,
  maxPage,
  pageNum,
  basePath,
}: ListPageProps) => (
  <>
    <Container>
      <Adsense client={AdsenseClient} {...AdsenseUnits.articleTop} />
    </Container>

    <Container>
      <PostList posts={posts} />
    </Container>

    <footer>
      <Container>
        <Pager basePath={basePath} maxPage={maxPage} pageNum={pageNum} />

        <Adsense client={AdsenseClient} {...AdsenseUnits.articleBottom} />
      </Container>
    </footer>
  </>
);
