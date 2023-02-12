import type { IPostItem } from "@/types/domain/Post";

export type ListPageProp = {
  posts: IPostItem[];
  maxPage: number;
  pageNum: number;
};
