const SITE_DOMAIN = process.env.SITE_URL || "https://blog.daisukekonishi.com";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_DOMAIN,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  generateIndexSitemap: true,
};
