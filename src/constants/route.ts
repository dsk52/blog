export const ROUTE = {
  top: "/",
  about: "/about",

  postListBase: "/post/page",
  postList: (pageNum: number) => `/post/page/${pageNum}`,
  postDetail: (slug: string) => `/post/${encodeURIComponent(slug)}`,
  postPreview: (contentId: string) => `/post/preview/${encodeURIComponent(contentId)}`,

  postTagListBy: (tagName: string) => `/post/tags/${tagName}`,
  postTagList: (tagName: string, pageNum: number) => `/post/tags/${tagName}/${pageNum}`,

  tagList: "/post/tags",

  ogImage: "/api/ogp",
  sitemap: "/sitemap.xml",
  feed: "/api/feed",
};

export const EXTERNAL_PAGE = {
  PROFILE: "https://daisukekonishi.com",
  TWITTER: "https://twitter.com/skd_nw",
};
