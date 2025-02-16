import type { GetServerSideProps, NextPage } from "next";

import { TagListPage } from "@/components/page/TagList/TagList";
import type { TagListPageProp } from "@/components/page/TagList/type";
import { calcMaxPage, calcOffset } from "@/components/ui/Pager/util";
import { getByTagId, getTagBySlug, POST_PER_PAGE } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";

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
  const offset = calcOffset(pageNum, POST_PER_PAGE);

  const response = await getByTagId(Tag.id, POST_PER_PAGE, offset);
  const posts = PostMapper.list(response.contents);

  const maxPage = calcMaxPage(response.totalCount, POST_PER_PAGE);

  return {
    props: {
      tag: Tag,
      posts,
      maxPage,
      pageNum,
    },
  };
};
