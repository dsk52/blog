import { useRouter } from "next/router";
import { useEffect } from "react";

import { useClient } from "@/hooks/useClient";

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
  const { asPath } = useRouter();
  const { isClient } = useClient();

  useEffect(() => {
    try {
      if (isClient) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error(err);
    }
  }, [asPath, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <ins
      key={asPath}
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
