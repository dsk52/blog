

import MyHead from "../../../components/Head/Head";
import { Base } from "../../../components/layouts/Base";
import { TagList } from "../../../components/ui/TagList/TagList";
import { getTags, type TagListItem } from "../../../libs/microcms";

import type { GetServerSideProps, NextPage } from "next";

type TagsPageProp = {
  tags: TagListItem[]
}

const TagIndexPage: NextPage<TagsPageProp> = ({ tags }) => (
  <Base head={
    <MyHead
      title="タグ一覧"
      description="記事に関連するタグの一覧ページです"
      url='/post/tags'
      pageType='website'
      index='index'
    />
  }>
    <>
      <TagList tags={tags} doLink />
    </>
  </Base >
)

export default TagIndexPage

export const getServerSideProps: GetServerSideProps = async (_) => {
  let tags: TagListItem[] = []
  const tagResponse = await getTags()
  tags = [...tags, ...tagResponse.contents]

  return {
    props: {
      tags
    }
  }
}
