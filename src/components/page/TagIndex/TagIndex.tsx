import { CommonLayout } from "@/components/layouts/CommonLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container/Container";
import { TagList } from "@/components/ui/TagList/TagList";
import { ROUTE } from "@/constants/route";

import type { TagsPageProp } from "./type";

export const TagIndexPage = ({ tags }: TagsPageProp) => (
  <CommonLayout>
    <Container>
      <TagList tags={tags} doLink />
      <Breadcrumb
        items={[{ label: "ホーム", href: ROUTE.top }, { label: "タグ一覧" }]}
        className="tw:mt-6"
      />
    </Container>
  </CommonLayout>
);
