import { ITag } from "../../../types/domain/Post";

export type Props = {
  tags: ITag[];
  doLink?: boolean;
};

export type TagItem = {
  doLink?: boolean;
} & ITag;
