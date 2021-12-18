export type PageBaseProp = {
  maxPage: number;
  pageNum: number;
};

export type PagerProps = {
  basePath: string;
} & PageBaseProp;
