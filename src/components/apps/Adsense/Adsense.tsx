import { useRouter } from "next/router";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

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

  useIsomorphicLayoutEffect(() => {
    try {
      if (typeof window !== "undefined" && client) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      // Pass
    }
  }, [asPath]);

  if (!isClient || !client) {
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
