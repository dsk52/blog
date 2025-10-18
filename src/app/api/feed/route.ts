import type { NextRequest } from "next/server";
import RSS from "rss";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { getFeedItems } from "@/libs/microcms";

export const revalidate = 3600; // 1時間キャッシュする

export async function GET(_req: NextRequest) {
  const xml = await generateFeedXml();

  return new Response(xml, {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      "X-Robots-Tag": "noindex",
    },
  });
}

async function generateFeedXml() {
  const feed = new RSS({
    title: SITE.name,
    description: SITE.description,
    site_url: SITE.url,
    feed_url: `${SITE.url}${ROUTE.feed}`,
    language: "ja",
  });

  const posts = await getFeedItems(10);

  posts.contents.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.body.slice(0, 200),
      date: new Date(post.createdAt ?? ""),
      url: `${SITE.url}${ROUTE.postDetail(post.slug)}`,
    });
  });

  return feed.xml();
}
