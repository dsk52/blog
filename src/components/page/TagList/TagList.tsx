import { clsx } from "clsx";

import { Adsense } from "@/components/apps/Adsense/Adsense";
import { PostList } from "@/components/features/post/PostList/PostList";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import type { TagListPageProp } from "@/components/page/TagList/type";
import { Container } from "@/components/ui/Container/Container";
import { Pager } from "@/components/ui/Pager/Pager";
import { AdsenseClient, AdsenseUnits } from "@/constants/google";
import { ROUTE } from "@/constants/route";

import { Seo } from "./Seo/Seo";

export const TagListPage = ({
  tag,
  posts,
  maxPage,
  pageNum,
}: TagListPageProp) => {
  return (
    <CommonLayout>
      <Seo tag={tag} pageNum={pageNum} />

      <div className={clsx("tw-space-y-8")}>
        <Container>
          <Adsense client={AdsenseClient} {...AdsenseUnits.articleTop} />
        </Container>

        <section>
          <Container>
            <PostList posts={posts} />
          </Container>
        </section>

        <footer>
          <Container>
            <Pager
              basePath={ROUTE.postTagListBy(tag.slug)}
              maxPage={maxPage}
              pageNum={pageNum}
            />

            <Adsense
              client={AdsenseClient}
              {...AdsenseUnits.articleBottom}
              wrapperStyles={{ minHeight: "350px" }}
            />
          </Container>
        </footer>
      </div>
    </CommonLayout>
  );
};
