import type { BlogPosting, WithContext } from "schema-dts";
import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import type { IPost } from "@/types/domain/Post";

/**
 * 読了時間を推定する（日本語400文字/分ベース）
 */
function estimateReadingTime(text: string): string {
  const cleanText = text.replace(/<[^>]*>/g, "").trim();
  const minutes = Math.ceil(cleanText.length / 400);
  return `PT${minutes}M`; // ISO 8601形式（例: PT5M = 5分）
}

/**
 * ブログ記事のJSON-LD構造化データを生成する
 */
function generateBlogPostJsonLd(post: IPost, slug: string): WithContext<BlogPosting> {
  // 記事の本文からdescriptionを生成（HTMLタグを除去し、最初の160文字を使用）
  const description =
    post.body
      .replace(/<[^>]*>/g, "") // HTMLタグを除去
      .replace(/\s+/g, " ") // 連続する空白を一つにまとめる
      .trim()
      .slice(0, 160) + (post.body.replace(/<[^>]*>/g, "").length > 160 ? "..." : "");

  // 画像URLの決定（サムネイルがある場合はそれを使用、なければOG画像生成）
  const imageUrl =
    post.thumbnail?.url ||
    `${SITE.url}${ROUTE.ogImage}?${new URLSearchParams({ title: post.title }).toString()}`;

  // 記事のURL
  const articleUrl = `${SITE.url}${ROUTE.postDetail(slug)}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: SITE.author.name,
      url: SITE.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    url: articleUrl,
    wordCount: post.body.replace(/<[^>]*>/g, "").length,
    keywords: post.tags.map((tag) => tag.name),
    articleSection: post.category.name,
    timeRequired: estimateReadingTime(post.body),
  };
}

interface BlogPostJsonLdProps {
  post: IPost;
  slug: string;
}

/**
 * ブログ記事のJSON-LD構造化データを出力するコンポーネント
 */
export function BlogPostJsonLd({ post, slug }: BlogPostJsonLdProps) {
  const jsonLd = generateBlogPostJsonLd(post, slug);

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD構造化データの出力に必要
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
