import MyHead from "@/components/Head/Head";
import { Base } from "@/components/layouts/Base";
import { ListPage } from "@/components/templates/List";
import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

import type { ListPageProp } from "@/components/page/type";
import type { NextPage } from "next";

export const IndexPage: NextPage<ListPageProp> = ({
  posts,
  maxPage,
  pageNum,
}) => (
  <Base
    head={
      <MyHead
        title={""}
        description={SITE.description}
        url={ROUTE.top}
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
