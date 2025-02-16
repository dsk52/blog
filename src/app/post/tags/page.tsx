import type { Metadata } from "next";

import { TagIndexPage } from "@/components/page/TagIndex/TagIndex";
import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import type { TagListItem } from "@/libs/microcms";
import { getTags } from "@/libs/microcms";

const title = `タグ一覧 | ${SITE.name}`;
const description = "記事に関連するタグの一覧ページです";
const url = `${SITE.url}${ROUTE.top}`;

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    url,
    type: "website",
  },
  alternates: {
    canonical: url,
  }
}

const fetchData = async () => {
  const tagResponse = await getTags();
  const tags: TagListItem[] = [...tagResponse.contents];

  return {
    tags,
  }
};

export default async function Page() {
  const props = await fetchData();

  return TagIndexPage(props);
}
