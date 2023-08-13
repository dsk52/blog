const SITE_DOMAIN = process.env.SITE_URL || "https://blog.daisukekonishi.com";
const DYNAMIC_SITEMAP_PATH = "server-sitemap-index.xml";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_DOMAIN,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  outDir: "./public",
  generateIndexSitemap: false, // NOTE: 動的生成するため、デフォルトのサイトマップ生成を止める
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_DOMAIN}/${DYNAMIC_SITEMAP_PATH}`],
  },
};
