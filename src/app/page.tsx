import type { Metadata } from "next";

import { IndexPage } from "@/components/page/Index/Index";
import { calcMaxPage } from "@/components/ui/Pager/util";
import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { getAllPost, POST_PER_PAGE } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";

export const dynamic = "force-dynamic";

const title = SITE.name;
const description = "PengNoteのAboutページです";
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
    canonical: url,
  },
};

const response = await getAllPost();
const posts = PostMapper.list(response.contents);

const pageNum = 1; // トップなので、1ページ目を確定
const maxPage = calcMaxPage(response.totalCount, POST_PER_PAGE);

export default function Page() {
  return IndexPage({
    posts,
    maxPage,
    pageNum,
  });
}
