import MyHead from "@/components/Head/Head";
import { Base } from "@/components/layouts/Base";
import { ListPage } from "@/components/templates/List";
import { ROUTE } from "@/constants/route";

import type { ListPageProp } from "@/components/page/type";

export const PostListPage = ({ posts, maxPage, pageNum }: ListPageProp) => {
  return (
    <Base
      head={
        <MyHead
          title="記事一覧"
          description="今までに書いた記事の一覧ページです"
          url={ROUTE.postList(pageNum)}
          canonicalUrl={ROUTE.postList(1)}
          pageType="website"
          index="index"
        />
      }
    >
      <ListPage
        posts={posts}
        basePath={ROUTE.postListBase}
        maxPage={maxPage}
        pageNum={pageNum}
      />
    </Base>
  );
};
