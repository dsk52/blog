import { useRouter } from "next/router";

import { FacebookShare } from "@/components/features/social/FacebookShare/FacebookShare";
import { TwitterShare } from "@/components/features/social/TwitterShare/TwitterShare";
import { SITE } from "@/constants/site";

import s from "./ShareList.module.css";

import type { Props } from "./type";

export const ShareList = ({ title }: Props) => {
  const { asPath } = useRouter();
  const url = `${SITE.url}${asPath}`;

  return (
    <ul className={s.ShareList}>
      <li>
        <TwitterShare title={title} url={url} />
      </li>
      <li>
        <FacebookShare url={url} />
      </li>
    </ul>
  );
};
