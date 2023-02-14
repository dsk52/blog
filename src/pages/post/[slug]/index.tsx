import MarkdownIt from "markdown-it";

import { PostDetailPage } from "@/components/page/PostDetail/PostDetail";
import { isDraft } from "@/components/page/PostDetail/util";
import { getByContentId, getBySlug, getPostSlugs } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";
import { isProduction } from "@/utilities/env";

import type { Params } from "@/components/page/PostDetail/type";
import type { PostProps } from "@/components/templates/Detail/type";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

const Page: NextPage<PostProps> = (props) => PostDetailPage(props);

export default Page;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const postPerPage = isProduction ? 100 : 10;

  let pageNum = 1;
  const paths: any[] = [];
  const res = await getPostSlugs(postPerPage, pageNum);

  let maxPage = 0;
  if (res.totalCount) {
    maxPage = Math.ceil(res.totalCount / postPerPage);
  }

  if (!res.contents.length) {
    return {
      paths: [{ params: { slug: "" } }],
      fallback: "blocking",
    };
  }

  res.contents.forEach(({ slug }) => {
    paths.push({ params: { slug } });
  });

  // 全ページ分取得して結合する
  if (isProduction) {
    while (pageNum <= maxPage) {
      const res = await getPostSlugs(postPerPage, paths.length + 1);
      res.contents.forEach(({ slug }) => {
        paths.push({ params: { slug } });
      });

      ++pageNum;
      // TODO sleep入れたほうがいいかも
    }
  }

  return {
    paths,
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
