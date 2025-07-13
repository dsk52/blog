import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

import type { microCmsResponse } from "@/types/api/Microcms";
import type { ApiPost, ApiTag } from "@/types/api/Post";

const microcms = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
  apiKey: process.env.MICROCMS_API_KEY ?? "",
});

const ENDPOINTS = {
  POST: "post",
  TAG: "tags",
};
type ENDPOINTS = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];

export type Draft = {
  draftKey: string;
};

export const isDraft = (arg: any): arg is Draft => {
  if (!arg?.draftKey) {
    return false;
  }

  return typeof arg.draftKey === "string";
};

export const POST_PER_PAGE = 12;

export async function getAllPost(
  limit = POST_PER_PAGE,
  offset = 0
): Promise<microCmsResponse<ApiPost>> {
  const params = {
    endpoint: ENDPOINTS.POST,
    queries: {
      fields: "title,slug,tags,publishedAt",
      orders: "-publishedAt",
      limit,
      offset,
    },
  };

  return await microcms.get(params);
}

export async function getAllSlugs(
  limit = POST_PER_PAGE,
  offset = 0
  // FIXME: contents内を削った状態にしたい
): Promise<microCmsResponse<{ slug: string }>> {
  const params = {
    endpoint: ENDPOINTS.POST,
    queries: {
      fields: "slug,updatedAt",
      orders: "-publishedAt",
      limit,
      offset,
    },
  };
  return await microcms.get(params);
}

export async function getFeedItems(
  limit = 0
): Promise<microCmsResponse<Pick<ApiPost, "title" | "body" | "slug" | "createdAt">>> {
  const params = {
    endpoint: ENDPOINTS.POST,
    queries: {
      fields: "title,slug,body,createdAt",
      orders: "-publishedAt",
      limit,
      offset: 0,
    },
  };

  return await microcms.get(params);
}

export async function getByContentId(
  contentId: string,
  draftKey: string
): Promise<microCmsResponse<ApiPost>> {
  return await microcms.get({
    endpoint: ENDPOINTS.POST,
    contentId,
    queries: {
      draftKey,
    },
  });
}

export async function getByContentIdAndDraftKey(
  contentId: string,
  draftKey?: string
): Promise<ApiPost> {
  const queries: MicroCMSQueries = {};
  if (draftKey?.length) {
    queries.draftKey = draftKey;
  }

  return await microcms.get({
    endpoint: ENDPOINTS.POST,
    contentId,
    queries,
  });
}

export async function getBySlug(
  slug: string,
  draftKey?: string
): Promise<microCmsResponse<ApiPost>> {
  const queries: MicroCMSQueries = {
    filters: `slug[equals]${slug}`,
  };
  if (draftKey?.length) {
    queries.draftKey = draftKey;
  }

  return await microcms.get({
    endpoint: ENDPOINTS.POST,
    queries,
  });
}

export async function getByTagId(
  tagId: string,
  limit = POST_PER_PAGE,
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

export async function getTags(limit = 100, offset = 0): Promise<microCmsResponse<TagListItem>> {
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

export async function getTagBySlug(slug: string): Promise<microCmsResponse<ApiTag>> {
  return await microcms.get({
    endpoint: ENDPOINTS.TAG,
    queries: { filters: `slug[equals]${slug}` },
  });
}
