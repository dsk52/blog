import { ROUTE } from "@/constants/route";

type Paths = {
  label: string;
  href: string;
};

export const NAV_ITEM: Paths[] = [
  {
    href: ROUTE.about,
    label: "About",
  },
  {
    href: ROUTE.tagList,
    label: "タグ一覧",
  },
];
