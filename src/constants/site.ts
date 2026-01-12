const SITE_URL = "https://blog.daisukekonishi.com";
const AUTHOR_ID = `${SITE_URL}#author`;

export const SITE = {
  name: "PengNote",
  description: "勉強した事や行った場所の感想を書くブログ",
  url: SITE_URL,
  author: {
    id: AUTHOR_ID,
    name: "Daisuke KONISHI",
    url: "https://daisukekonishi.com",
  },
  ogp: {
    imageUrl: "/images/ogp.png",
  },
} as const;

export type SITE_TYPE = typeof SITE;
