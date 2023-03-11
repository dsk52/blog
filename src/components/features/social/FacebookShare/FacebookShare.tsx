import Link from "next/link";
import { useMemo } from "react";

import { FacebookIcon } from "@/components/icons/Facebook/Facebook";

import { BASE_SHARE_URL } from "./const";

import type { FacebookShareProps, FacebookQueryParams } from "./type";

export const FacebookShare = ({ url }: FacebookShareProps): JSX.Element => {
  const shareUrl = useMemo(() => {
    const params: FacebookQueryParams = {
      u: url,
    };
    const queryString = new URLSearchParams(params).toString();

    return `${BASE_SHARE_URL}?${queryString}`;
  }, [url]);

  return (
    <Link href={shareUrl} rel="canonical" target="_blank">
      <FacebookIcon size="24px" />
    </Link>
  );
};
