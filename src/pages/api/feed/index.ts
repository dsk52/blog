import RSS from "rss";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { getFeedItems } from "@/libs/microcms";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method && req.method.toLocaleLowerCase() !== "get") {
    return res.status(405).json({ message: "" });
  }
  const xml = await generateFeedXml();

  res.statusCode = 200;
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate"); // 1時間キャッシュする
  res.setHeader("Content-Type", "text/xml");
  return res.end(xml);
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
