/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://blog.daisukekonishi.com",
  generateRobotsTxt: true, // (optional)
  sitemapSize: 5000,
  outDir: "./public",
};
