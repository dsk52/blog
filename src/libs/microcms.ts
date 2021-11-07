import { createClient } from "microcms-js-sdk";

import { ApiPost } from "../types/api/Post";
import { listResponse } from "../types/Microcms";

const microcms = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
  apiKey: process.env.MICROCMS_API_KEY ?? "",
});

const ENDPOINT = {
  POST: "post",
};
type ENDPOINT = typeof ENDPOINT[keyof typeof ENDPOINT];

export async function getAllPost(): Promise<listResponse<ApiPost>> {
  return await microcms.get({
    endpoint: ENDPOINT.POST,
    queries: {
      orders: "-publishedAt",
    },
  });
}

export async function getPostByContentId(contentId: string) {
  return await microcms.get({
    endpoint: ENDPOINT.POST,
    contentId: contentId,
  });
}
