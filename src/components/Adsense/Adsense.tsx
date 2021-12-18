import { useRouter } from "next/router";
import { useEffect } from "react";

import type { GoogleAdsenseProps } from "./type";
import type { VFC } from 'react'

export const Adsense: VFC<GoogleAdsenseProps> = ({
  className = '',
  style = { display: 'block' },
  client,
  slot,
  format = 'auto',
  layout = '',
  layoutKey = '',
  responsive = 'false',
}) => {
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, [asPath]);

  return (
    <aside key={asPath}>
      <p>[Ads.]</p>
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
    </aside>
  );
};
