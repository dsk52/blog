import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { PostDetailPage } from "@/components/page/PostDetail/PostDetail";
import type { Params, PostProps } from "@/components/page/PostDetail/type";
import { isDraft } from "@/components/page/PostDetail/util";
import { md } from "@/libs/markdown-it";
import {
  getByContentIdAndDraftKey,
  getBySlug,
  getByTagId,
} from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";
import type { ApiPost } from "@/types/api/Post";
import type { IPostItem } from "@/types/domain/Post";
import { isProduction } from "@/utilities/env";

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

  let postResponse: ApiPost | undefined;
  if (draftKey && draftKey.draftKey) {
    const res = await getByContentIdAndDraftKey(slug, draftKey.draftKey);
    if (!res) {
      return {
        notFound: true,
      };
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
    const displayCount = 6;
    const relatedPostDatas = await getByTagId(tagId, displayCount + 1); // HACK: 後続処理で除外する可能性があるため多めに取る
    // NOTE: 表示中の記事は関連記事に含めない
    const filteredRelatedPosts = relatedPostDatas.contents
      .filter((p) => p.id !== postResponse?.id)
      .slice(0, displayCount);

    relatedPosts = PostMapper.relatedPosts(filteredRelatedPosts);
  }

  const post = await PostMapper.detail(postResponse);
  post.body = md.render(post.body);

  if (draftKey.draftKey) {
    return { props: { post, relatedPosts: [], ...draftKey } }; // 下書きデータはキャッシュさせない
  }
  return {
    props: { post, relatedPosts },
    revalidate: isProduction ? 60 * 30 : undefined,
  };
};
