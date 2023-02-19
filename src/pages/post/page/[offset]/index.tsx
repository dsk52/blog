import { PostListPage } from "@/components/page/PostList/PostList";
import { calcOffset, calcMaxPage } from "@/components/ui/Pager/util";
import { postPerPage, getAllPost } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";

import type { ListPageProp } from "@/components/page/type";
import type { GetServerSideProps, NextPage } from "next";

const Page: NextPage<ListPageProp> = (props) => PostListPage(props);

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const offsetParams = context.params?.offset;
  if (!offsetParams) {
    return {
      notFound: true,
    };
  }
  const pageNum = parseInt(offsetParams[0]);

  const offset = calcOffset(pageNum, postPerPage);

  const response = await getAllPost(postPerPage, offset);
  const posts = PostMapper.list(response.contents);

  const maxPage = calcMaxPage(response.totalCount, postPerPage);

  return {
    props: {
      posts,
      maxPage,
      pageNum,
    },
  };
};
