import type { GetStaticProps, NextPage } from "next";

import { TagIndexPage } from "@/components/page/TagIndex/TagIndex";
import type { TagsPageProp } from "@/components/page/TagIndex/type";
import type { TagListItem } from "@/libs/microcms";
import { getTags } from "@/libs/microcms";

const Page: NextPage<TagsPageProp> = (props) => TagIndexPage(props);

export default Page;

export const getStaticProps: GetStaticProps = async (_) => {
  const tagResponse = await getTags();
  const tags: TagListItem[] = [...tagResponse.contents];

  return {
    props: {
      tags,
    },
  };
};
