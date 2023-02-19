import { IndexPage } from "@/components/page/Index/Index";
import { calcMaxPage } from "@/components/ui/Pager/util";
import { getAllPost, postPerPage } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";

import type { ListPageProp } from "@/components/page/type";
import type { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async (_) => {
  const response = await getAllPost();
  const posts = PostMapper.list(response.contents);

  const pageNum = 1; // トップなので、1ページ目を確定
  const maxPage = calcMaxPage(response.totalCount, postPerPage);

  return {
    props: {
      posts,
      maxPage,
      pageNum,
    },
  };
};

const Page: NextPage<ListPageProp> = (props) => IndexPage(props);

export default Page;
