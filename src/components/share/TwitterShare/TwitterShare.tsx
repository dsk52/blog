import Link from "next/link"
import { useCallback } from "react"

import type { ShareLink } from "../type"

type TwitterQueryParams = {
  text?: string
  url: string
}

type TwitterShareProps = {
  title: string
  hashtags?: String[],
} & ShareLink

const BASE_SHARE_URL = 'https://twitter.com/intent/tweet';

export const TwitterShare = ({ url, title, children }: TwitterShareProps): JSX.Element => {
  const buildShareURL = useCallback(
    (url: string, title: string): string => {
      const params: TwitterQueryParams = {
        text: title,
        url
      }

      const queryString = new URLSearchParams(params).toString()
      return `${BASE_SHARE_URL}?${queryString}`
    }
    , [])

  return (
    <Link href={buildShareURL(url, title)}>
      <a rel="canonical" target='_blank'>
        {children}
      </a>
    </Link>
  )
}