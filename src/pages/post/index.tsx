import React from "react";

import MyHead from "../../components/Head/Head";
import { List } from '../../components/layouts/List/List';
import { ListPage } from '../../components/templates/ListPage';
import { PostList } from '../../components/ui/PostList/PostList';
import { microcms } from '../../libs/microcms';
import { PostMapper } from '../../mapper/PostMapper';

import type { ApiPost } from '../../types/api/Post';
import type { IPost } from '../../types/domain/Post';
import type { listResponse } from "../../types/Microcms";
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
  const response: listResponse<ApiPost> = await microcms.get({
    endpoint: 'post',
    queries: {
      orders: '-publishedAt'
    }
  })
  const posts = await PostMapper.list(response.contents);

  return {
    props: {
      posts
    }
  }
}

export default Post
