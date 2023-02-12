import { Base } from "@/components/layouts/Base";
import { DetailPage } from "@/components/templates/Detail";
import { ROUTE } from "@/constants/route";

import { Seo } from "./Seo/Seo";

import type { PostProps } from "@/components/templates/Detail/type";

export const PostDetailPage = ({ post, draftKey }: PostProps) => {
  const pagePath = ROUTE.postDetail(post.slug);

  return (
    <Base>
      <Seo title={post.title} slug={post.slug} publishedAt={post.publishedAt} />
      <DetailPage post={post} path={pagePath} draftKey={draftKey} />
    </Base>
  );
};
