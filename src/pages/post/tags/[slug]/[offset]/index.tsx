import { TagListPage } from "@/components/page/TagList/TagList";
import { calcOffset, calcMaxPage } from "@/components/ui/Pager/util";
import { getTagBySlug, postPerPage, getByTagId } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";

import type { TagListPageProp } from "@/components/page/TagList/type";
import type { GetServerSideProps, NextPage } from "next";

const Page: NextPage<TagListPageProp> = (props) => TagListPage(props);

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slugs = context.params?.slug;
  if (!slugs) {
    return {
      notFound: true,
    };
  }
  const slug = typeof slugs === "string" ? slugs : slugs[0];

  let offsetParams = context.params?.offset;
  if (typeof offsetParams === "undefined") {
    offsetParams = "0";
  }
  const offsetParam =
    typeof offsetParams === "string" ? offsetParams : offsetParams[0];
  const pageNum = parseInt(offsetParam);
  // Tag check
  const Tags = await getTagBySlug(slug);
  if (Tags.contents.length === 0) {
    return {
      notFound: true,
    };
  }
  const Tag = Tags.contents[0];

  // Post Check
  const offset = calcOffset(pageNum, postPerPage);

  const response = await getByTagId(Tag.id, postPerPage, offset);
  const posts = PostMapper.list(response.contents);

  const maxPage = calcMaxPage(response.totalCount, postPerPage);

  return {
    props: {
      tag: Tag,
      posts,
      maxPage,
      pageNum,
    },
  };
};
