import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostDetailPage } from "@/components/page/PostDetail/PostDetail";
import { md } from "@/libs/markdown-it";
import { getByContentIdAndDraftKey } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";
import type { ApiPost } from "@/types/api/Post";
import type { PageProps } from "@/types/page";
import { extractBlogCardUrls, replaceBlogCardUrls } from "@/utilities/blogCard";
import { generateBlogCardHTML } from "@/utilities/blogCardHtml";
import { fetchMultipleOGP } from "@/utilities/ogp";

export const dynamic = "force-dynamic";

const NO_INDEX = {
  index: false,
  follow: false,
} as const;

const getDraftKey = (searchParams?: Record<string, string | string[] | undefined>) => {
  const draftKey = searchParams?.draftKey;
  if (typeof draftKey === "string") {
    return draftKey;
  }
  if (Array.isArray(draftKey)) {
    return draftKey[0];
  }

  return undefined;
};

const fetchPreviewPost = async (contentId: string, draftKey: string) => {
  let postResponse: ApiPost;
  try {
    postResponse = await getByContentIdAndDraftKey(contentId, draftKey);
  } catch {
    return undefined;
  }

  const post = await PostMapper.detail(postResponse);
  post.body = md.render(post.body);

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
    }
  }

  return post;
};

export const metadata: Metadata = {
  title: "プレビュー画面",
  description: "記事プレビュー画面です。",
  robots: NO_INDEX,
};

export default async function Page(props: PageProps<{ contentId: string }>) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const draftKey = getDraftKey(searchParams);
  if (!draftKey) {
    notFound();
  }

  const post = await fetchPreviewPost(params.contentId, draftKey);
  if (!post) {
    notFound();
  }

  return <PostDetailPage post={post} relatedPosts={[]} />;
}
