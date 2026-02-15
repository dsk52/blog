import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { getAllPost, getAllSlugs, getTags, POST_PER_PAGE } from "@/libs/microcms";

import type { SitemapUrlEntry } from "./xml";

const SLUG_FETCH_LIMIT = 1000;

const collectPostPageUrls = async () => {
  const posts = await getAllPost();
  const totalPage = Math.ceil(posts.totalCount / POST_PER_PAGE);

  return Array.from({ length: totalPage }, (_value, index) => ({
    loc: `${SITE.url}${ROUTE.postList(index + 1)}`,
    changefreq: "weekly",
    priority: 0.5,
  })) satisfies SitemapUrlEntry[];
};

const collectTagUrls = async () => {
  const tags = await getTags();

  return tags.contents.map((tag) => ({
    loc: `${SITE.url}${ROUTE.postTagList(tag.slug, 1)}`,
    changefreq: "weekly",
    priority: 0.4,
  })) satisfies SitemapUrlEntry[];
};

const collectPostDetailUrls = async () => {
  const posts = await getAllSlugs(SLUG_FETCH_LIMIT);

  while (posts.contents.length < posts.totalCount) {
    const response = await getAllSlugs(SLUG_FETCH_LIMIT, posts.contents.length);
    posts.contents.push(...response.contents);
  }

  return posts.contents.map((content) => ({
    loc: `${SITE.url}${ROUTE.postDetail(content.slug)}`,
    lastmod: new Date(content.updatedAt).toISOString(),
    changefreq: "daily",
    priority: 0.9,
  })) satisfies SitemapUrlEntry[];
};

const dedupeEntries = (entries: SitemapUrlEntry[]) => {
  const locMap = new Map<string, SitemapUrlEntry>();

  for (const entry of entries) {
    if (!locMap.has(entry.loc)) {
      locMap.set(entry.loc, entry);
    }
  }

  return Array.from(locMap.values());
};

export const collectSitemapEntries = async () => {
  const staticEntries: SitemapUrlEntry[] = [
    { loc: SITE.url, changefreq: "daily", priority: 0.7 },
    { loc: `${SITE.url}${ROUTE.about}`, changefreq: "monthly", priority: 0.3 },
    { loc: `${SITE.url}${ROUTE.tagList}`, changefreq: "weekly", priority: 0.6 },
    { loc: `${SITE.url}${ROUTE.feed}`, changefreq: "daily", priority: 0.7 },
  ];

  const [postPageEntries, tagEntries, detailEntries] = await Promise.all([
    collectPostPageUrls(),
    collectTagUrls(),
    collectPostDetailUrls(),
  ]);

  return dedupeEntries([...staticEntries, ...postPageEntries, ...tagEntries, ...detailEntries]);
};
