import { CommonLayout } from "@/components/layouts/CommonLayout";
import { TagList } from "@/components/ui/TagList/TagList";

import { Seo } from "./Seo/Seo";

import type { TagsPageProp } from "./type";

export const TagIndexPage = ({ tags }: TagsPageProp) => (
  <CommonLayout>
    <Seo />
    <TagList tags={tags} doLink />
  </CommonLayout>
);
