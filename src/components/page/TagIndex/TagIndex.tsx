import { Base } from "@/components/layouts/Base";
import { TagList } from "@/components/ui/TagList/TagList";

import { Seo } from "./Seo/Seo";

import type { TagsPageProp } from "./type";

export const TagIndexPage = ({ tags }: TagsPageProp) => (
  <Base>
    <Seo />
    <TagList tags={tags} doLink />
  </Base>
);
