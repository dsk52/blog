import MarkdownIt from "markdown-it";

import { PostDetailPage } from "@/components/page/PostDetail/PostDetail";
import { isDraft } from "@/components/page/PostDetail/util";
import { getByContentIdAndDraftKey, getBySlug, getByTagId } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";
import { isProduction } from "@/utilities/env";

import type { Params } from "@/components/page/PostDetail/type";
import type { PostProps } from "@/components/templates/Detail/type";
import type { IPostItem } from "@/types/domain/Post";
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

  let postResponse;
  if (draftKey && draftKey.draftKey) {
    const res = await getByContentIdAndDraftKey(slug, draftKey.draftKey);
    if (!res) {
      return {
        notFound: true
      }
    }
    postResponse = res;
  } else {
    const res = await getBySlug(slug);
    if (!res.contents || !res.contents.length) {
      return {
        notFound: true,
      };
    }
    postResponse = res.contents[0];
  }
  
  const tagId = postResponse.tags.at(0)?.id;
  let relatedPosts: IPostItem[] = [];
  if (tagId && !draftKey.draftKey) {
    const relatedPostDatas = await getByTagId(tagId, 6);
    relatedPosts = PostMapper.relatedPosts(relatedPostDatas.contents);
  }
  
  const post = await PostMapper.detail(postResponse);

  const md: MarkdownIt = new MarkdownIt({
    html: true,
    breaks: true,
    typographer: true,
  });
  post.body = md.render(post.body);

  if (draftKey.draftKey) {
    return { props: { post, relatedPosts: [], ...draftKey } }; // 下書きデータはキャッシュさせない
  }
  return {
    props: { post, relatedPosts },
    revalidate: isProduction ? 60 * 30 : 10,
  };
};
