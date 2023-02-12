import MyHead from "@/components/Head/Head";
import { Base } from "@/components/layouts/Base";
import { DetailPage } from "@/components/templates/Detail";

import { createExcerptFromBody } from "./util";

import type { PostProps } from "@/components/templates/Detail/type";

export const PostDetailPage = ({ post, draftKey }: PostProps) => {
  const pagePath = `/post/${post.slug}`;

  // description周りで使うため、本文から指定文字抜き出す
  const excerpt = createExcerptFromBody(post.body, 100);

  return (
    <Base
      head={
        <MyHead
          title={post.title}
          description={excerpt}
          url={pagePath}
          pageType="article"
          index="index"
        />
      }
    >
      <DetailPage post={post} path={pagePath} draftKey={draftKey} />
    </Base>
  );
};
