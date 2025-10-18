import { clsx } from "clsx";

import { Adsense } from "@/components/apps/Adsense/Adsense";
import { PostList } from "@/components/features/post/PostList/PostList";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import type { TagListPageProp } from "@/components/page/TagList/type";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container/Container";
import { Pager } from "@/components/ui/Pager/Pager";
import { AdsenseClient, AdsenseUnits } from "@/constants/google";
import { ROUTE } from "@/constants/route";

export const TagListPage = ({ tag, posts, maxPage, pageNum }: TagListPageProp) => {
  return (
    <CommonLayout>
      <div className={clsx("tw:space-y-8")}>
        <Container>
          <Adsense client={AdsenseClient} {...AdsenseUnits.articleTop} />
        </Container>

        <section>
          <Container>
            <PostList posts={posts} />

            <Pager basePath={ROUTE.postTagListBy(tag.slug)} maxPage={maxPage} pageNum={pageNum} />
          </Container>
        </section>

        <footer>
          <Container>
            <Breadcrumb
              items={[
                { label: "ホーム", href: ROUTE.top },
                { label: "タグ一覧", href: ROUTE.tagList },
                { label: `${tag.name}タグの記事一覧` },
              ]}
              className="tw:mb-6"
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
