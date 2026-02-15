import { collectSitemapEntries } from "@/libs/sitemap/collect-urls";
import { splitSitemapEntries } from "@/libs/sitemap/split";
import { createSitemapXmlResponse, renderUrlSetXml } from "@/libs/sitemap/xml";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<Record<string, string | string[] | undefined>>;
};

export async function GET(_request: Request, context: RouteContext) {
  const params = context?.params ? await context.params : {};
  const id = params.id;

  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    return new Response("Not Found", { status: 404 });
  }

  const entries = await collectSitemapEntries();
  const chunks = splitSitemapEntries(entries);
  const index = Number(id);

  if (index < 0 || index >= chunks.length) {
    return new Response("Not Found", { status: 404 });
  }

  return createSitemapXmlResponse(renderUrlSetXml(chunks[index]));
}
