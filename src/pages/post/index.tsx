import React from "react";

import MyHead from "../../components/Head/Head";
import { List } from '../../components/layouts/List/List';
import { ListPage } from '../../components/templates/ListPage';
import { PostList } from '../../components/ui/PostList/PostList';
import { getAllPost } from '../../libs/microcms';
import { PostMapper } from '../../mapper/PostMapper';

import type { IPost } from '../../types/domain/Post';
import type { NextPage } from "next"

type Prop = {
  posts: IPost[]
}

const Post: NextPage<Prop> = ({ posts }) => (
  <>

    <List head={
      <MyHead
        title="一覧"
        description="一覧"
        url="/post"
      />
    }>

      <ListPage>
        <PostList posts={posts}></PostList>
      </ListPage>
    </List>
  </>
)

export const getStaticProps = async () => {
  const response = await getAllPost()
  const posts = await PostMapper.list(response.contents);

  return {
    props: {
      posts
    }
  }
}

export default Post
