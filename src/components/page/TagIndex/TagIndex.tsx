import MyHead from "@/components/Head/Head";
import { Base } from "@/components/layouts/Base";
import { TagList } from "@/components/ui/TagList/TagList";

import type { TagsPageProp } from "./type";

export const TagIndexPage = ({ tags }: TagsPageProp) => (
  <Base
    head={
      <MyHead
        title="タグ一覧"
        description="記事に関連するタグの一覧ページです"
        url="/post/tags"
        pageType="website"
        index="index"
      />
    }
  >
    <>
      <TagList tags={tags} doLink />
    </>
  </Base>
);
