import { Base } from "@/components/layouts/Base";
import { DetailPage } from "@/components/templates/Detail";

import { Seo } from "./Seo/Seo";

import type { PostProps } from "@/components/templates/Detail/type";

export const PostDetailPage = ({ post, relatedPosts, draftKey }: PostProps) => {
  return (
    <Base>
      <Seo title={post.title} slug={post.slug} publishedAt={post.publishedAt} thumbnail={post.thumbnail} />
      <DetailPage post={post} relatedPosts={relatedPosts} draftKey={draftKey} />
    </Base>
  );
};
