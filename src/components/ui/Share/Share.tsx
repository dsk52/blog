import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon } from "react-share";

import { siteURL } from '../../../constants/site';
import s from './Share.module.css'

import type { VFC } from "react";

type Props = {
  title: string
  path: string
}

export const Share: VFC<Props> = ({ title, path }) => {
  const url = `${siteURL}${path}`

  return (
    <ul className={s.ShareList}>
      <li className={s.ShareListItem}>
        <TwitterShareButton
          title={title}
          url={url}
        >
          <TwitterIcon size={48} round={true} />
        </TwitterShareButton>
      </li>

      <li className={s.ShareListItem}>
        <FacebookShareButton
          url={url}
        >
          <FacebookIcon size={48} round={true} />
        </FacebookShareButton>
      </li>
    </ul>
  )
}
