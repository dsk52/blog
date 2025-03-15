const SITE_DOMAIN = process.env.SITE_URL || "https://blog.daisukekonishi.com";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_DOMAIN,
  sitemapSize: 5000,
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/api/ogp/*", "/api/preview/*"],
      },
    ],
  },
};
