import { TwitterIcon } from "@/components/icons/Twitter/Twitter";
import { TwitterShare } from "@/components/share/TwitterShare/TwitterShare";
import { SITE } from "@/constants/site";

import s from './Share.module.css'

import type { Props } from "./type";

export const Share = ({ title, path }: Props) => {
  const url = `${SITE.url}${path}`

  return (
    <ul className={s.ShareList}>
      <li className={s.ShareListItem}>
        <TwitterShare
          title={title}
          url={url}
        >
          <TwitterIcon size='48px' />
        </TwitterShare>
      </li>
    </ul>
  )
}
