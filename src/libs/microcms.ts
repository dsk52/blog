import { createClient } from "microcms-js-sdk";

import { ApiPost } from "../types/api/Post";
import { microCmsResponse } from "../types/Microcms";

const microcms = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
  apiKey: process.env.MICROCMS_API_KEY ?? "",
});

const ENDPOINTS = {
  POST: "post",
};
type ENDPOINTS = typeof ENDPOINTS[keyof typeof ENDPOINTS];

export async function getAllPost(
  limit = 0,
  offset = 0
): Promise<microCmsResponse<ApiPost>> {
  let params = {
    endpoint: ENDPOINTS.POST,
    queries: {
      fields: "title,slug,category,publishedAt",
      orders: "-publishedAt",
      limit: 10,
      offset: offset,
    },
  };
  if (limit != 0) {
    params.queries["limit"] = limit;
  }

  return await microcms.get(params);
}

export async function getPostSlugs(
  limit = 10,
  offset = 10
): Promise<microCmsResponse<{ slug: string }>> {
  let params = {
    endpoint: ENDPOINTS.POST,
    queries: {
      fields: "slug",
      orders: "-publishedAt",
      limit: 10,
      offset: offset,
    },
  };
  if (limit != 0) {
    params.queries["limit"] = limit;
  }

  return await microcms.get(params);
}

export async function getBySlug(
  slug: string
): Promise<microCmsResponse<ApiPost>> {
  return await microcms.get({
    endpoint: ENDPOINTS.POST,
    queries: { filters: `slug[equals]${slug}` },
  });
}
