import type { CSSProperties } from "react";

import type { AdsenseOption } from "@/constants/google";

export type GoogleAdsenseProps = {
  className?: string;
  style?: CSSProperties;
  client: string;
  layout?: string;
  wrapperStyles?: CSSProperties;
} & AdsenseOption;
