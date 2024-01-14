import type { ITag } from "@/types/domain/Post";

export type TagListProps = {
  tags: ITag[];
  doLink?: boolean;
  className?: HTMLDivElement["className"];
};
