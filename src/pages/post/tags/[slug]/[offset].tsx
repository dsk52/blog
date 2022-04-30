import React from "react";

import MyHead from "../../../../components/Head/Head";
import { Base } from "../../../../components/layouts/Base";
import { ListPage } from "../../../../components/templates/List";
import { getByTagId, getTagBySlug, postPerPage } from "../../../../libs/microcms";
import { PostMapper } from "../../../../models/mapper/PostMapper";
import { calcMaxPage, calcOffset } from "../../../../utilities/page";

import type { ApiTag } from '../../../../types/api/Post';
import type { IPostItem } from "../../../../types/domain/Post";
import type { GetServerSideProps, NextPage } from 'next';

export type TagListPageProp = {
  tag: ApiTag
  posts: IPostItem[],
  maxPage: number,
  pageNum: number
}


const TagSlugPage: NextPage<TagListPageProp> = ({ tag, posts, maxPage, pageNum }) => {
  const basePath = `/post/tags/${tag.slug}`

  return (
    <Base head={
      <MyHead
        title={`${tag.name}タグの記事一覧`}
        description={`${tag.name}タグに関連する記事の一覧です`}
        url={`/post/tags/${tag.slug}/${pageNum}`}
        pageType='website'
        index='index'
      />
    }>
      <ListPage
        posts={posts}
        basePath={basePath}
        maxPage={maxPage}
        pageNum={pageNum}
      />
    </Base>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slugs = context.params?.slug
  if (!slugs) {
    return {
      notFound: true
    }
  }
  const slug = typeof slugs === 'string' ? slugs : slugs[0]

  let offsetParams = context.params?.offset
  if (typeof offsetParams === 'undefined') {
    offsetParams = '0'
  }
  const offsetParam = typeof offsetParams === 'string' ? offsetParams : offsetParams[0]
  const pageNum = parseInt(offsetParam) // TODO Numberで処理する

  // Tag check
  const Tags = await getTagBySlug(slug)
  if (Tags.contents.length === 0) {
    return {
      notFound: true
    }
  }
  const Tag = Tags.contents[0]

  // Post Check
  const offset = calcOffset(pageNum, postPerPage)

  const response = await getByTagId(Tag.id, postPerPage, offset)
  const posts = PostMapper.list(response.contents);

  const maxPage = calcMaxPage(response.totalCount, postPerPage)

  return {
    props: {
      tag: Tag,
      posts,
      maxPage: maxPage - 1,
      pageNum
    }
  }
}

export default TagSlugPage

