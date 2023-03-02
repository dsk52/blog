import { useRouter } from "next/router";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

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
  const didLogRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (didLogRef.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      didLogRef.current = true;
    } catch (err) {
      console.error(err);
    }
  }, [asPath]);

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div key={asPath}>
      <ins
        className={`${className} adsbygoogle`}
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};
