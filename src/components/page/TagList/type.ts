import type { ApiTag } from "@/types/api/Post";
import type { IPostItem } from "@/types/domain/Post";

export type TagListPageProp = {
  tag: ApiTag;
  posts: IPostItem[];
  maxPage: number;
  pageNum: number;
};
