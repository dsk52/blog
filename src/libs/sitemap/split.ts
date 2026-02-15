import type { SitemapUrlEntry } from "./xml";

export const SITEMAP_CHUNK_SIZE = 5000;

export const splitSitemapEntries = (entries: SitemapUrlEntry[], chunkSize = SITEMAP_CHUNK_SIZE) => {
  if (entries.length === 0) {
    return [[]] as SitemapUrlEntry[][];
  }

  const chunks: SitemapUrlEntry[][] = [];

  for (let index = 0; index < entries.length; index += chunkSize) {
    chunks.push(entries.slice(index, index + chunkSize));
  }

  return chunks;
};
