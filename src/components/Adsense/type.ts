import type { CSSProperties } from "react";

export type GoogleAdsenseProps = {
  className?: string;
  style?: CSSProperties;
  client: string;
  slot: number;
  layout?: string;
  layoutKey?: string;
  format?: string;
  responsive?: string;
};
