import { clsx } from "clsx";

import type { BaseIconProps } from "@/components/icons/type";

export const HatenaIcon = ({ size = "20px" }: BaseIconProps) => (
  <img
    src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
    alt="このエントリーをはてなブックマークに追加"
    width={size}
    height={size}
    className={clsx("tw-border-none")}
  />
);
