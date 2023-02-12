import { Base } from "@/components/layouts/Base";
import { ListPage } from "@/components/templates/List";
import { ROUTE } from "@/constants/route";

import { Seo } from "./Seo/Seo";

import type { ListPageProp } from "@/components/page/type";

export const PostListPage = ({ posts, maxPage, pageNum }: ListPageProp) => {
  return (
    <Base>
      <Seo pageNum={pageNum} />
      <ListPage
        posts={posts}
        basePath={ROUTE.postListBase}
        maxPage={maxPage}
        pageNum={pageNum}
      />
    </Base>
  );
};
