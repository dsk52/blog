const SITE_DOMAIN = process.env.SITE_URL || "https://blog.daisukekonishi.com";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_DOMAIN,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  outDir: "./out",
  exclude: ["/sitemap.xml"],
  generateIndexSitemap: false,
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_DOMAIN}/sitemap`],

    transformRobotsTxt: async (_, robotsTxt) => {
      // sitemapは動的生成にしたのでデフォルト生成なものを記載しないように調整
      const withoutDefaultSitemap = robotsTxt.replace(
        `Sitemap: ${SITE_DOMAIN}/sitemap.xml`,
        "",
      );

      return withoutDefaultSitemap;
    },
  },
};
