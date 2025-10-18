import { clsx } from "clsx";

import { Adsense } from "@/components/apps/Adsense/Adsense";
import { PostList } from "@/components/features/post/PostList/PostList";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import type { ListPageProp } from "@/components/page/type";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container/Container";
import { Pager } from "@/components/ui/Pager/Pager";
import { AdsenseClient, AdsenseUnits } from "@/constants/google";
import { ROUTE } from "@/constants/route";

export const PostListPage = ({ posts, maxPage, pageNum }: ListPageProp) => {
  return (
    <CommonLayout>
      <div className={clsx("tw:space-y-8")}>
        <section>
          <Container>
            <PostList posts={posts} />

            <Pager basePath={ROUTE.postListBase} maxPage={maxPage} pageNum={pageNum} />
          </Container>
        </section>

        <footer>
          <Container>
            <Breadcrumb
              items={[{ label: "ホーム", href: ROUTE.top }, { label: "記事一覧" }]}
              className="tw:my-6"
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
