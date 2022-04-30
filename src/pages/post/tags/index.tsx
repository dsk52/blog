
import Link from "next/link";

import MyHead from "../../../components/Head/Head";
import { Base } from "../../../components/layouts/Base";
import { Tag } from "../../../components/ui/TagList/TagList";
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
      <ul style={{ display: 'flex', flexWrap: 'wrap', listStyleType: 'none', gap: '1.6em' }}>
        {tags && tags.map(tag => (
          <li key={tag.id} className="">
            <Link href={`/post/tags/${tag.slug}/0`}>
              <a>
                <Tag {...tag} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  </Base>
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
