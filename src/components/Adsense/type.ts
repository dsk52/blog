import { CSSProperties } from "react";

export type GoogleAdsenseProps = {
  className?: string;
  style?: CSSProperties;
  client: string;
  slot: string;
  layout?: string;
  layoutKey?: string;
  format?: string;
  responsive?: string;
};
