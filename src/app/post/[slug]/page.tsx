import type { Metadata } from "next";
import { cache } from "react";

import { PostDetailPage } from "@/components/page/PostDetail/PostDetail";
import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { md } from "@/libs/markdown-it";
import { getBySlug, getByTagId } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";
import type { ApiPost, ApiTag } from "@/types/api/Post";
import type { IPostItem } from "@/types/domain/Post";
import { extractBlogCardUrls, replaceBlogCardUrls } from "@/utilities/blogCard";
import { generateBlogCardHTML } from "@/utilities/blogCardHtml";
import { fetchMultipleOGP } from "@/utilities/ogp";

export const dynamicParams = true;

export const revalidate = 1800; // 1800秒 = 30分

export async function generateStaticParams() {
  return [];
}

// 関連記事のデータ取得
async function fetchRelatedPosts(tagId: ApiTag["id"], currentPostId: ApiPost["id"]) {
  const DISPLAY_COUNT = 6;

  const relatedPostDatas = await getByTagId(tagId, DISPLAY_COUNT + 1); // HACK: 後続処理で除外する可能性があるため多めに取る
  // NOTE: 表示中の記事は関連記事に含めない
  const filteredRelatedPosts = relatedPostDatas.contents
    .filter((p) => p.id !== currentPostId)
    .slice(0, DISPLAY_COUNT);

  return PostMapper.relatedPosts(filteredRelatedPosts);
}

const fetchData = cache(async (slug: string) => {
  // const slug = await params?.slug;
  // if (!slug) {
  //   return {
  //     notFound: true,
  //   };
  // }

  // const draftKey = isDraft(previewData)
  //   ? { draftKey: previewData.draftKey }
  //   : {};

  let postResponse: ApiPost | undefined;
  // if (draftKey && draftKey.draftKey) {
  //   const res = await getByContentIdAndDraftKey(slug, draftKey.draftKey);
  //   if (!res) {
  //     return {
  //       notFound: true,
  //     };
  //   }
  //   postResponse = res;
  // } else {
  const res = await getBySlug(slug);
  if (!res.contents || !res.contents.length) {
    return {
      post: undefined,
      relatedPosts: [] as IPostItem[],
    };
  }
  postResponse = res.contents[0];
  // }

  const tagId = postResponse.tags.at(0)?.id;
  let relatedPosts: IPostItem[] = [];
  if (
    tagId
    // && !draftKey.draftKey
  ) {
    relatedPosts = await fetchRelatedPosts(tagId, postResponse.id); // TODO: 処理を別実行できるようにする
  }

  const post = await PostMapper.detail(postResponse);
  post.body = md.render(post.body);

  // ブログカード処理: URLを抽出してOGP情報を取得し、ブログカードに置換
  const blogCardUrls = extractBlogCardUrls(post.body);
  if (blogCardUrls.length > 0) {
    try {
      const urls = blogCardUrls.map((item) => item.url);
      const ogpDataList = await fetchMultipleOGP(urls);

      post.body = replaceBlogCardUrls(post.body, blogCardUrls, (url) => {
        const ogpData = ogpDataList.find((data) => data.url === url);
        return ogpData
          ? generateBlogCardHTML(ogpData)
          : `<a href="${url}" target="_blank" rel="noopener">${url}</a>`;
      });
    } catch (error) {
      console.warn("ブログカード処理でエラーが発生しました:", error);
      // エラー時は元のHTMLをそのまま使用
    }
  }

  return {
    post,
    relatedPosts,
  };
});

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const { slug } = params;
  if (!slug) return {};

  const { post } = await fetchData(slug);
  if (!post) return {};

  const { title: postTitle, thumbnail, publishedAt } = post;

  const title = postTitle;
  const description = SITE.description;
  const url = `${SITE.url}${ROUTE.postDetail(slug)}`;

  const image = thumbnail
    ? {
        url: thumbnail.url,
        with: thumbnail.width,
        height: thumbnail.height,
      }
    : {
        url: `${SITE.url}${ROUTE.ogImage}?${new URLSearchParams({
          title,
        }).toString()}`,
        width: 450,
        height: 279,
      };

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      url,
      description,
      images: [image],
      type: "article",
      publishedTime: publishedAt,
    },
  };
};

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { post, relatedPosts } = await fetchData(params.slug);
  if (!post) {
    return null;
  }
  return PostDetailPage({ post, relatedPosts });
}
