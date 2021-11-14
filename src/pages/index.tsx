import MyHead from "../components/Head/Head";
import { List } from '../components/layouts/List/List';
import { ListPage } from "../components/templates/ListPage";
import { PostList } from "../components/ui/PostList/PostList";
import { getAllPost } from "../libs/microcms";
import { PostMapper } from "../mapper/PostMapper";

import type { IPost } from "../types/domain/Post";
import type { NextPage } from "next";


type Prop = {
  posts: IPost[]
}

const Index: NextPage<Prop> = ({ posts }) => (
  <List head={
    <MyHead
      title="記事一覧"
      description="今までに書いた記事の一覧ページです"
      url="/"
    />
  }>
    <ListPage>
      <PostList posts={posts}></PostList>
    </ListPage>
  </List>
);

export const getStaticProps = async () => {
  const response = await getAllPost()
  const posts = await PostMapper.list(response.contents);

  return { props: { posts } }
}

export default Index;
