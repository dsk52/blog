import { useEffect } from "react";

import type { GoogleAdsenseProps } from "./type";

export const Adsense = ({
  className = "",
  style = { display: "block" },
  client,
  slot,
  format = "auto",
  layout = "",
  layoutKey = "",
  responsive = false,
}: GoogleAdsenseProps) => {
  useEffect(() => {
    try {
      if (typeof window === "object") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ins
      className={`${className} adsbygoogle`}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    ></ins>
  );
};
