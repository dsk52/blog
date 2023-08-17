import { Adsense } from "@/components/apps/Adsense/Adsense";
import { PostList } from "@/components/features/post/PostList/PostList";
import { Container } from "@/components/ui/Container/Container";
import { Pager } from "@/components/ui/Pager/Pager";
import { AdsenseClient, AdsenseUnits } from "@/constants/google";

import s from "./style.module.css";

import type { ListPageProps } from "./type";

export const ListPage = ({
  posts,
  maxPage,
  pageNum,
  basePath,
}: ListPageProps) => (
  <div>
    <Container>
      <Adsense client={AdsenseClient} {...AdsenseUnits.articleTop} />
    </Container>

    <section className={s.postList}>
      <Container>
        <PostList posts={posts} />
      </Container>
    </section>

    <footer>
      <Container>
        <Pager basePath={basePath} maxPage={maxPage} pageNum={pageNum} />

        <div className={s.postListFooterAds}>
          <Adsense
            client={AdsenseClient}
            {...AdsenseUnits.articleBottom}
            wrapperStyles={{ minHeight: "350px" }}
          />
        </div>
      </Container>
    </footer>
  </div>
);
