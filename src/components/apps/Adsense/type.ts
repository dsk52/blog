import type { AdsenseOption } from "@/constants/google";
import type { CSSProperties } from "react";

export type GoogleAdsenseProps = {
  className?: string;
  style?: CSSProperties;
  client: string;
  layout?: string;
  wrapperStyles?: CSSProperties;
} & AdsenseOption;
