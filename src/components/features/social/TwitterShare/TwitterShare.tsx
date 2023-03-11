import Link from "next/link";
import { useMemo } from "react";

import { TwitterIcon } from "@/components/icons/Twitter/Twitter";
import { SITE } from "@/constants/site";

import { BASE_SHARE_URL } from "./const";

import type { TwitterShareProps, TwitterQueryParams } from "./type";

export const TwitterShare = ({
  url,
  title,
}: TwitterShareProps): JSX.Element => {
  const shareUrl = useMemo(() => {
    const params: TwitterQueryParams = {
      text: `${title} | ${SITE.name}`,
      url,
    };
    const queryString = new URLSearchParams(params).toString();

    return `${BASE_SHARE_URL}?${queryString}`;
  }, [title, url]);

  return (
    <Link href={shareUrl} rel="canonical" target="_blank">
      <TwitterIcon size="24px" />
    </Link>
  );
};
