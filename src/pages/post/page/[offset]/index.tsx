import type { GetServerSideProps, NextPage } from "next";

import { PostListPage } from "@/components/page/PostList/PostList";
import type { ListPageProp } from "@/components/page/type";
import { calcMaxPage, calcOffset } from "@/components/ui/Pager/util";
import { getAllPost, POST_PER_PAGE } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";

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

  const offset = calcOffset(pageNum, POST_PER_PAGE);

  const response = await getAllPost(POST_PER_PAGE, offset);
  const posts = PostMapper.list(response.contents);

  const maxPage = calcMaxPage(response.totalCount, POST_PER_PAGE);

  return {
    props: {
      posts,
      maxPage,
      pageNum,
    },
  };
};
