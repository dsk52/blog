import { notFound } from "next/navigation";
import { cache } from "react";

import { TagListPage } from "@/components/page/TagList/TagList";
import { calcMaxPage, calcOffset, parsePageNum } from "@/components/ui/Pager/util";
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

const fetchTagPageInfo = cache(
  async ({ slug, offset: offsetParam }: Awaited<PageParams["params"]>) => {
    const pageNum = parsePageNum(offsetParam, POST_PER_PAGE);
    if (!pageNum) {
      return {
        tag: undefined,
        maxPage: 0,
        pageNum: 0,
      };
    }

    const Tags = await getTagBySlug(slug);
    if (Tags.contents.length === 0) {
      return {
        tag: undefined,
        maxPage: 0,
        pageNum: 0,
      };
    }
    const Tag = Tags.contents[0];

    const tagPostsSummary = await getByTagId(Tag.id, 1, 0);
    const maxPage = Math.max(calcMaxPage(tagPostsSummary.totalCount, POST_PER_PAGE), 1);
    if (pageNum > maxPage) {
      return {
        tag: undefined,
        maxPage,
        pageNum,
      };
    }

    return {
      tag: Tag,
      maxPage,
      pageNum,
    };
  }
);

const fetchData = cache(async (params: Awaited<PageParams["params"]>) => {
  const tagPageInfo = await fetchTagPageInfo(params);
  if (!tagPageInfo.tag) {
    return {
      ...tagPageInfo,
      posts: [],
    };
  }

  const { tag, maxPage, pageNum } = tagPageInfo;
  const offset = calcOffset(pageNum, POST_PER_PAGE);
  const response = await getByTagId(tag.id, POST_PER_PAGE, offset);
  const posts = PostMapper.list(response.contents);

  return {
    tag,
    posts,
    maxPage,
    pageNum,
  };
});

export const dynamicParams = true;

export const generateMetadata = async (props: PageParams) => {
  const params = await props.params;
  const res = await fetchTagPageInfo(params);
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
    notFound();
  }

  const params = await fetchData({
    slug,
    offset: offset ? offset : "0",
  });
  if (!params.tag) {
    notFound();
  }

  return TagListPage(params);
}
