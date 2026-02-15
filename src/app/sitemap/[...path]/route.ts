import { collectSitemapEntries } from "@/libs/sitemap/collect-urls";
import { splitSitemapEntries } from "@/libs/sitemap/split";
import { createSitemapXmlResponse, renderUrlSetXml } from "@/libs/sitemap/xml";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const params = context?.params ? await context.params : { path: [] };

  if (params.path.length !== 1) {
    return new Response("Not Found", { status: 404 });
  }

  const matched = params.path[0].match(/^(\d+)\.xml$/);
  if (!matched) {
    return new Response("Not Found", { status: 404 });
  }

  const index = Number(matched[1]);
  const entries = await collectSitemapEntries();
  const chunks = splitSitemapEntries(entries);

  if (index < 0 || index >= chunks.length) {
    return new Response("Not Found", { status: 404 });
  }

  return createSitemapXmlResponse(renderUrlSetXml(chunks[index]));
}
