import { CommonLayout } from "@/components/layouts/CommonLayout";
import { Container } from "@/components/ui/Container/Container";
import { TagList } from "@/components/ui/TagList/TagList";

import { Seo } from "./Seo/Seo";
import type { TagsPageProp } from "./type";

export const TagIndexPage = ({ tags }: TagsPageProp) => (
  <CommonLayout>
    <Seo />
    <Container>
      <TagList tags={tags} doLink />
    </Container>
  </CommonLayout>
);
