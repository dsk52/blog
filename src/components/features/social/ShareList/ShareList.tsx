import { TwitterShare } from "@/components/features/social/TwitterShare/TwitterShare";
import { SITE } from "@/constants/site";

import s from "./ShareList.module.css";

import type { Props } from "./type";

export const ShareList = ({ title, path }: Props) => {
  const url = `${SITE.url}${path}`;

  return (
    <ul className={s.ShareList}>
      <li className={s.ShareListItem}>
        <TwitterShare title={title} url={url} />
      </li>
    </ul>
  );
};
