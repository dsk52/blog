export interface ICommonSchema {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export type microCmsResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
