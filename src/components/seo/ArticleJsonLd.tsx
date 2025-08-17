import type { Article, WithContext } from "schema-dts";
import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import type { IPost } from "@/types/domain/Post";

/**
 * 記事のJSON-LD構造化データを生成する
 */
function generateArticleJsonLd(post: IPost, slug: string): WithContext<Article> {
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
    "@type": "Article",
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
  };
}

interface ArticleJsonLdProps {
  post: IPost;
  slug: string;
}

/**
 * 記事のJSON-LD構造化データを出力するコンポーネント
 */
export function ArticleJsonLd({ post, slug }: ArticleJsonLdProps) {
  const jsonLd = generateArticleJsonLd(post, slug);

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
