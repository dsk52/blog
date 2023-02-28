type AdsenseTypes = "articleTop" | "articleIn" | "articleBottom";

export type AdsenseOption = {
  format: "auto" | "fluid" | "rectangle";
  layout?: string;
  layoutKey?: string;
  slot: string;
  responsive?: boolean;
};

export const AdsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";

export const AdsenseUnits: Record<AdsenseTypes, AdsenseOption> = {
  articleTop: {
    slot: "8895295937",
    format: "auto",
    responsive: true,
  },
  articleIn: {
    slot: "6098398744",
    format: "fluid",
    layout: "in-article",
  },
  articleBottom: {
    slot: "1904168614",
    format: "auto",
    responsive: true,
  },
};
