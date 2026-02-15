import { SITE } from "@/constants/site";
import { collectSitemapEntries } from "@/libs/sitemap/collect-urls";
import { splitSitemapEntries } from "@/libs/sitemap/split";
import { createSitemapXmlResponse, renderSitemapIndexXml } from "@/libs/sitemap/xml";

export const revalidate = 3600;

export async function GET() {
  const entries = await collectSitemapEntries();
  const chunks = splitSitemapEntries(entries);
  const sitemapUrls = chunks.map((_chunk, index) => `${SITE.url}/sitemap/${index}.xml`);

  return createSitemapXmlResponse(renderSitemapIndexXml(sitemapUrls));
}
