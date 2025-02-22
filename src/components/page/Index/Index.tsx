import { clsx } from "clsx";

import { Adsense } from "@/components/apps/Adsense/Adsense";
import { PostList } from "@/components/features/post/PostList/PostList";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import type { ListPageProp } from "@/components/page/type";
import { Container } from "@/components/ui/Container/Container";
import { Pager } from "@/components/ui/Pager/Pager";
import { AdsenseClient, AdsenseUnits } from "@/constants/google";
import { ROUTE } from "@/constants/route";

export const IndexPage = ({ posts, maxPage, pageNum }: ListPageProp) => (
  <CommonLayout>
    <div className={clsx("tw:space-y-8")}>
      <section>
        <Container>
          <PostList posts={posts} />
        </Container>
      </section>

      <footer>
        <Container>
          <div className={clsx("tw:space-y-4")}>
            <Pager
              basePath={ROUTE.postListBase}
              maxPage={maxPage}
              pageNum={pageNum}
            />

            <Adsense
              client={AdsenseClient}
              {...AdsenseUnits.articleBottom}
              wrapperStyles={{ minHeight: "350px" }}
            />
          </div>
        </Container>
      </footer>
    </div>
  </CommonLayout>
);
