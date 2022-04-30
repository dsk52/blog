import { createClient } from "microcms-js-sdk";

import { microCmsResponse } from "../types/api/Microcms";
import { ApiPost, ApiTag } from "../types/api/Post";

const microcms = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
  apiKey: process.env.MICROCMS_API_KEY ?? "",
});

const ENDPOINTS = {
  POST: "post",
  TAG: "tags",
};
type ENDPOINTS = typeof ENDPOINTS[keyof typeof ENDPOINTS];

export const postPerPage = 12;

export async function getAllPost(
  limit = 0,
  offset = 0
): Promise<microCmsResponse<ApiPost>> {
  let params = {
    endpoint: ENDPOINTS.POST,
    queries: {
      fields: "title,slug,tags,publishedAt",
      orders: "-publishedAt",
      limit: postPerPage,
      offset: offset,
    },
  };
  if (limit != 0) {
    params.queries["limit"] = limit;
  }

  return await microcms.get(params);
}

export async function getPostSlugs(
  limit = postPerPage,
  offset = 0
): Promise<microCmsResponse<{ slug: string }>> {
  let params = {
    endpoint: ENDPOINTS.POST,
    queries: {
      fields: "slug",
      orders: "-publishedAt",
      limit,
      offset,
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

export async function getByTagId(
  tagId: string,
  limit = postPerPage,
  offset = 0
): Promise<microCmsResponse<ApiPost>> {
  return await microcms.get({
    endpoint: ENDPOINTS.POST,
    queries: {
      filters: `tags[contains]${tagId}`,
      orders: "-publishedAt",
      limit,
      offset,
    },
  });
}

export type TagListItem = Pick<ApiTag, "id" | "slug" | "name">;

export async function getTags(
  limit = 100,
  offset = 0
): Promise<microCmsResponse<TagListItem>> {
  return await microcms.get({
    endpoint: ENDPOINTS.TAG,
    queries: {
      fields: "id,slug,name",
      orders: "-slug",
      limit,
      offset,
    },
  });
}

export async function getTagBySlug(
  slug: string
): Promise<microCmsResponse<ApiTag>> {
  return await microcms.get({
    endpoint: ENDPOINTS.TAG,
    queries: { filters: `slug[equals]${slug}` },
  });
}
