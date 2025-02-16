import type { Metadata, NextPage } from "next";

import { IndexPage } from "@/components/page/Index/Index";
import type { ListPageProp } from "@/components/page/type";
import { calcMaxPage } from "@/components/ui/Pager/util";
import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { getAllPost, POST_PER_PAGE } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";

export const dynamic = 'force-dynamic';

const title = `${SITE.name} | ${SITE.description}`;
const description = SITE.description;
const url = `${SITE.url}${ROUTE.top}`;
export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    url,
    type: "website",
  },
  alternates: {
    canonical: url
  }
}

const response = await getAllPost();
const posts = PostMapper.list(response.contents);

const pageNum = 1; // トップなので、1ページ目を確定
const maxPage = calcMaxPage(response.totalCount, POST_PER_PAGE);

const Page: NextPage<ListPageProp> = (props) => IndexPage({
  posts,
  maxPage,
  pageNum,
});

export default Page;
