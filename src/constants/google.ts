type AdsenseTypes =
  | "articleTop"
  | "articleIn"
  | "articleBottom"
  | "relatedPost";

export type AdsenseOption = {
  format: "auto" | "fluid" | "rectangle";
  layout?: string;
  layoutKey?: string;
  slot: string;
  responsive?: boolean;
};

export const AdsenseClient = "ca-pub-5766460361259641";

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
  relatedPost: {
    slot: "3720838686",
    layoutKey: "-hg-3+1f-3d+2z",
    format: "fluid",
  },
};
