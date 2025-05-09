import { Metadata } from "next";
import { cache } from "react";

import { TagListPage } from "@/components/page/TagList/TagList";
import { calcMaxPage, calcOffset } from "@/components/ui/Pager/util";
import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { getByTagId, getTagBySlug, POST_PER_PAGE } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";

type PageParams = {
  params: Promise<{
    slug: string;
    offset: string;
  }>;
};

export const dynamic = "force-dynamic";

const fetchData = cache(
  async ({ slug, offset: offsetParam }: Awaited<PageParams["params"]>) => {
    const pageNum = parseInt(offsetParam, 10);
    // Tag check
    const Tags = await getTagBySlug(slug);
    if (Tags.contents.length === 0) {
      return {
        tag: undefined,
        posts: [],
        maxPage: 0,
        pageNum: 0,
      };
    }
    const Tag = Tags.contents[0];

    // Post Check
    const offset = calcOffset(pageNum, POST_PER_PAGE);

    const response = await getByTagId(Tag.id, POST_PER_PAGE, offset);
    const posts = PostMapper.list(response.contents);

    const maxPage = calcMaxPage(response.totalCount, POST_PER_PAGE);

    return {
      tag: Tag,
      posts,
      maxPage,
      pageNum,
    };
  },
);

export const dynamicParams = true;

export const generateMetadata = async (props: PageParams) => {
  const params = await props.params;
  const { slug: slugParam } = params;
  const res = await fetchData({
    slug: slugParam,
    offset: "0",
  });
  if (!res.tag) {
    return {};
  }

  const { name, slug } = res.tag;

  const title = `${name}タグの記事一覧`;
  const description = `${name}タグに関連する記事の一覧です`;
  const url = `${SITE.url}${ROUTE.postTagList(slug, 1)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      url,
      type: "website",
    },
    alternates: {
      canonical: url,
    },
  };
};

export default async function Page(props: PageParams) {
  const { slug, offset } = await props.params;
  if (!slug) {
    return {
      notFound: true,
    };
  }

  const params = await fetchData({
    slug,
    offset: offset ? offset : "0",
  });
  if (!params.tag) {
    return {
      notFound: true,
    };
  }

  return TagListPage(params);
}
