import s from './Share.module.css'
import { SITE } from "../../../constants/site";
import { TwitterIcon } from "../../icons/Twitter/Twitter";
import { TwitterShare } from "../../share/TwitterShare/TwitterShare";

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
