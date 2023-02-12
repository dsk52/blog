import type { ITag } from "@/types/domain/Post";

export type Props = {
  tags: ITag[];
  doLink?: boolean;
  className?: HTMLDivElement["className"];
};

export type TagItem = {
  doLink?: boolean;
} & ITag;
