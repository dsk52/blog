import { Params } from "next/dist/server/router";

import MyHead from "../components/Head/Head";
import { List } from '../components/layouts/List/List';
import { ListPage } from "../components/templates/ListPage";
import { getAllPost } from "../libs/microcms";
import { PostMapper } from "../mapper/PostMapper";

import type { ListPageProp } from "./post/page/[offset]";
import type { GetStaticProps, NextPage } from "next";



const Index: NextPage<ListPageProp> = ({ posts }) => (
  <List head={
    <MyHead
      title="記事一覧"
      description="今までに書いた記事の一覧ページです"
      url="/"
      pageType={"website"}
    />
  }>
    <ListPage
      posts={posts}
      maxPage={1}
      pageNum={1}
    />
  </List>
);

export const getStaticProps: GetStaticProps<ListPageProp, Params> = async () => {
  const response = await getAllPost()
  const posts = await PostMapper.list(response.contents);

  const postPerPage = 12;

  const pageNum = 1;  // トップなので、1ページ目を確定
  const maxPage = Math.ceil(response.totalCount / postPerPage)

  return {
    props: {
      posts,
      maxPage,
      pageNum
    }
  }
}

export default Index;
