import { clsx } from "clsx";

import { Adsense } from "@/components/apps/Adsense/Adsense";
import { PostList } from "@/components/features/post/PostList/PostList";
import { Base } from "@/components/layouts/Base";
import { Container } from "@/components/ui/Container/Container";
import { Pager } from "@/components/ui/Pager/Pager";
import { AdsenseClient, AdsenseUnits } from "@/constants/google";
import { ROUTE } from "@/constants/route";

import { Seo } from "./Seo/Seo";

import type { ListPageProp } from "@/components/page/type";

export const IndexPage = ({ posts, maxPage, pageNum }: ListPageProp) => (
  <Base>
    <Seo />
    <div className={clsx("tw-space-y-8")}>
      <section>
        <Container>
          <Adsense client={AdsenseClient} {...AdsenseUnits.articleTop} />
        </Container>
      </section>

      <section>
        <Container>
          <PostList posts={posts} />
        </Container>
      </section>

      <footer>
        <Container>
          <div className={clsx("tw-space-y-4")}>
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
  </Base>
);
