import { useMemo } from "react";

import { FacebookIcon } from "@/components/icons/Facebook/Facebook";
import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";

import { BASE_SHARE_URL } from "./const";
import type { FacebookQueryParams, FacebookShareProps } from "./type";

export const FacebookShare = ({ url }: FacebookShareProps): JSX.Element => {
  const shareUrl = useMemo(() => {
    const params: FacebookQueryParams = {
      u: url,
    };
    const queryString = new URLSearchParams(params).toString();

    return `${BASE_SHARE_URL}?${queryString}`;
  }, [url]);

  return (
    <AnchorLink href={shareUrl} target="_blank">
      <FacebookIcon size="46px" />
    </AnchorLink>
  );
};
