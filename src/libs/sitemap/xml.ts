export type SitemapChangefreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type SitemapUrlEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: SitemapChangefreq;
  priority?: number;
};

const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>';

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const renderTag = (tagName: string, value: string | number) =>
  `<${tagName}>${escapeXml(String(value))}</${tagName}>`;

export const renderSitemapIndexXml = (sitemapUrls: string[]) => {
  const body = sitemapUrls
    .map((sitemapUrl) => `<sitemap>${renderTag("loc", sitemapUrl)}</sitemap>`)
    .join("");

  return `${XML_HEADER}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;
};

export const renderUrlSetXml = (entries: SitemapUrlEntry[]) => {
  const body = entries
    .map((entry) => {
      const fields = [
        renderTag("loc", entry.loc),
        entry.lastmod ? renderTag("lastmod", entry.lastmod) : "",
        entry.changefreq ? renderTag("changefreq", entry.changefreq) : "",
        typeof entry.priority === "number" ? renderTag("priority", entry.priority) : "",
      ].join("");

      return `<url>${fields}</url>`;
    })
    .join("");

  return `${XML_HEADER}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
};

export const createSitemapXmlResponse = (xml: string) =>
  new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
