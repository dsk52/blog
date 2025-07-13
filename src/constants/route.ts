export const ROUTE = {
  top: "/",
  about: "/about",

  postListBase: "/post/page",
  postList: (pageNum: number) => `/post/page/${pageNum}`,
  postDetail: (slug: string) => `/post/${encodeURIComponent(slug)}`,

  postTagListBy: (tagName: string) => `/post/tags/${tagName}`,
  postTagList: (tagName: string, pageNum: number) => `/post/tags/${tagName}/${pageNum}`,

  tagList: "/post/tags",

  ogImage: "/api/ogp",
  sitemap: "/sitemap",
  feed: "/api/feed",
};

export const EXTERNAL_PAGE = {
  PROFILE: "https://daisukekonishi.com",
  TWITTER: "https://twitter.com/skd_nw",
};
