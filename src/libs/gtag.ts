export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const existsGaId = GA_TRACKING_ID !== "";

type EventProp = {
  [key: string]: any;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!existsGaId) {
    return;
  }

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: EventProp) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
