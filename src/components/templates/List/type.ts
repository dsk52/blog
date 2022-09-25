import type { IPostItem } from "../../../types/domain/Post";
import type { PageBaseProp } from "../../ui/Pager/type";

export type ListPageProps = {
  posts: IPostItem[];
  basePath: string;
} & PageBaseProp;
