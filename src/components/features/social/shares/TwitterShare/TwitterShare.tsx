import { type JSX, useMemo } from "react";

import { TwitterIcon } from "@/components/icons/Twitter/Twitter";
import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";
import { SITE } from "@/constants/site";

import { BASE_SHARE_URL } from "./const";
import type { TwitterQueryParams, TwitterShareProps } from "./type";

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
    <AnchorLink href={shareUrl} target="_blank">
      <TwitterIcon size="36px" fill="black" />
    </AnchorLink>
  );
};
