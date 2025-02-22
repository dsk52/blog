import type { NextApiRequest } from "next";
import RSS from "rss";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { getFeedItems } from "@/libs/microcms";

const REVALIDATE_SECONDS = 3600; // 1時間キャッシュする

export const revalidate = REVALIDATE_SECONDS

export async function GET(
  req: NextApiRequest
) {
  const xml = await generateFeedXml();

  return new Response(xml, {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": `s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate`,
    },
  })
}

async function generateFeedXml() {
  const feed = new RSS({
    title: SITE.url,
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
