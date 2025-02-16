import { clsx } from "clsx";
import Script from "next/script";

import { HatenaIcon } from "@/components/icons/Hatena/Hatena";

export const HatenaShare = () => {
  return (
    <div>
      <a
        href="https://b.hatena.ne.jp/entry/"
        className={clsx(
          "tw:transition-opacity tw:hover:opacity-70",
          "hatena-bookmark-button",
        )}
        data-hatena-bookmark-layout="touch"
      >
        <HatenaIcon size="36" />
      </a>

      <Script
        type="text/javascript"
        src="https://b.st-hatena.com/js/bookmark_button.js"
        async
      ></Script>
    </div>
  );
};
