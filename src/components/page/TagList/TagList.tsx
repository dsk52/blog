import { Base } from "@/components/layouts/Base";
import { ListPage } from "@/components/templates/List";
import { ROUTE } from "@/constants/route";

import { Seo } from "./Seo/Seo";

import type { TagListPageProp } from "@/components/page/TagList/type";

export const TagListPage = ({
  tag,
  posts,
  maxPage,
  pageNum,
}: TagListPageProp) => {
  const basePath = ROUTE.postTagListBy(tag.slug);

  return (
    <Base>
      <Seo tag={tag} pageNum={pageNum} />
      <ListPage
        posts={posts}
        basePath={basePath}
        maxPage={maxPage}
        pageNum={pageNum}
      />
    </Base>
  );
};
