// import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon } from "react-share";

import { SITE } from "../../../constants/site";
import { TwitterShare } from "../../share/TwitterShare/TwitterShare";
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
          {/* <TwitterIcon size={48} round={true} /> */}
          Twitter
        </TwitterShare>
      </li>

      <li className={s.ShareListItem}>
        {/* <FacebookShareButton
          url={url}
        >
          <FacebookIcon size={48} round={true} />
        </FacebookShareButton> */}
      </li>
    </ul>
  )
}
