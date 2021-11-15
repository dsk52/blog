import { ParsedUrlQuery } from 'node:querystring' // eslint-disable-line import/order

import MyHead from "../../../components/Head/Head";
import { List } from "../../../components/layouts/List/List";
import { ListPage } from "../../../components/templates/ListPage";
import { PostList } from "../../../components/ui/PostList/PostList";
import { getAllPost } from "../../../libs/microcms";
import { PostMapper } from "../../../mapper/PostMapper";
import { IPostItem } from "../../../types/domain/Post";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";


type Prop = {
  posts: IPostItem[]
}

interface Params extends ParsedUrlQuery {
  offset: string
}

const Index: NextPage<Prop> = ({ posts }) => (
  <List head={
    <MyHead
      title="記事一覧"
      description="今までに書いた記事の一覧ページです"
      url="/"
      pageType={"website"}
    />
  }>
    <ListPage>
      <PostList posts={posts}></PostList>
    </ListPage>
  </List>
);

const postPerPage = 12;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = []
  try {
    let index = 0;
    const limit = 1;// 1件でも取ればtotalCountが返ってくるので1件だけ取得する
    const res = await getAllPost(limit, index)

    const maxPage = Math.ceil(res.totalCount / postPerPage)

    let pageNum = 1;
    do {
      paths.push({ params: { offset: pageNum.toString() } })
      ++pageNum
    } while (pageNum < maxPage);

  } catch (error) {
    console.error(error);
    return {
      paths: [{ params: { offset: '1' } }],
      fallback: 'blocking'
    }
  }

  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<Prop, Params> = async (context) => {
  const offset = await context.params?.offset
  if (!offset) {
    return {
      notFound: true
    }
  }

  const response = await getAllPost(postPerPage, parseInt(offset))
  const posts = await PostMapper.list(response.contents);

  return { props: { posts } }
}

export default Index;
