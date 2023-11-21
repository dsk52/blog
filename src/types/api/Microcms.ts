import type {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListResponse,
  MicroCMSObjectContent,
} from "microcms-js-sdk";

export interface ICommonSchema extends MicroCMSDate {
  id: MicroCMSContentId["id"];
}

export interface microCmsResponse<T> extends MicroCMSListResponse<T> {}
