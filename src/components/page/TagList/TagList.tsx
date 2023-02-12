import MyHead from "@/components/Head/Head";
import { Base } from "@/components/layouts/Base";
import { ListPage } from "@/components/templates/List";
import { ROUTE } from "@/constants/route";

import type { TagListPageProp } from "@/components/page/TagList/type";

export const TagListPage = ({
  tag,
  posts,
  maxPage,
  pageNum,
}: TagListPageProp) => {
  const basePath = ROUTE.postTagListBy(tag.slug);

  return (
    <Base
      head={
        <MyHead
          title={`${tag.name}タグの記事一覧`}
          description={`${tag.name}タグに関連する記事の一覧です`}
          url={ROUTE.postTagList(tag.slug, pageNum)}
          canonicalUrl={ROUTE.postTagList(tag.slug, 1)}
          pageType="website"
          index="index"
        />
      }
    >
      <ListPage
        posts={posts}
        basePath={basePath}
        maxPage={maxPage}
        pageNum={pageNum}
      />
    </Base>
  );
};
