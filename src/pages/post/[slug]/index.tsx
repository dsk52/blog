import MarkdownIt from "markdown-it";

import { PostDetailPage } from "@/components/page/PostDetail/PostDetail";
import { isDraft } from "@/components/page/PostDetail/util";
import { getByContentId, getBySlug } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";
import { isProduction } from "@/utilities/env";

import type { Params } from "@/components/page/PostDetail/type";
import type { PostProps } from "@/components/templates/Detail/type";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

const Page: NextPage<PostProps> = (props) => PostDetailPage(props);

export default Page;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PostProps, Params> = async ({
  params,
  previewData,
}) => {
  const slug = await params?.slug;
  if (!slug) {
    return {
      notFound: true,
    };
  }

  const draftKey = isDraft(previewData)
    ? { draftKey: previewData.draftKey }
    : {};

  let res;
  if (draftKey && draftKey.draftKey) {
    res = await getByContentId(slug, draftKey.draftKey);
  } else {
    res = await getBySlug(slug);
  }

  if (!res.contents || !res.contents.length) {
    return {
      notFound: true,
    };
  }

  const post = await PostMapper.detail(res.contents[0]);

  const md: MarkdownIt = new MarkdownIt({
    html: true,
    breaks: true,
    typographer: true,
  });
  post.body = md.render(post.body);

  if (draftKey.draftKey) {
    return { props: { post, ...draftKey } }; // 下書きデータはキャッシュさせない
  }
  return { props: { post }, revalidate: isProduction ? 60 : 10 };
};
