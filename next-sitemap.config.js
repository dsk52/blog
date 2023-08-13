const SITE_DOMAIN = process.env.SITE_URL || "https://blog.daisukekonishi.com";
const DYNAMIC_SITEMAP_PATH = "server-sitemap-index.xml";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_DOMAIN,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  outDir: "./public",
  exclude: [`/${DYNAMIC_SITEMAP_PATH}`],
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_DOMAIN}/${DYNAMIC_SITEMAP_PATH}`],
  },
};
