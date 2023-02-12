export const SITE = {
  name: "PengNote",
  description: "勉強した事や行った場所の感想を書くブログ",
  url: "https://blog.daisukekonishi.com",
  author: {
    name: "Daisuke KONISHI",
  },
  ogp: {
    imageUrl: "/images/ogp.png",
  },
} as const;

export type SITE_TYPE = typeof SITE;
