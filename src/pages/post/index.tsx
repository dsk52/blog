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
    {posts.map((post: IPost) => (
      <div key={post.id}>
        {post.title}
      </div>
    ))}
  </>
)

export const getStaticProps = async () => {
  const response: listResponse<ApiPost> = await microcms.get({
    endpoint: 'articles'
  })
  const posts = await PostMapper.list(response.contents);

  return {
    props: {
      posts
    }
  }
}

export default Post
