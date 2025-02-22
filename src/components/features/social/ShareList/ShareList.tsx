"use client";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

import { FacebookShare } from "@/components/features/social/shares/FacebookShare/FacebookShare";
import { HatenaShare } from "@/components/features/social/shares/HatenaShare/HatenaShare";
import { TwitterShare } from "@/components/features/social/shares/TwitterShare/TwitterShare";
import { SITE } from "@/constants/site";

import type { Props } from "./type";

export const ShareList = ({ title }: Props) => {
  const pathname = usePathname();
  const url = `${SITE.url}${pathname}`;

  return (
    <ul
      className={clsx(
        "tw:flex tw:justify-center tw:items-center tw:gap-x-4 tw:md:gap-x-7",
      )}
    >
      <li>
        <TwitterShare title={title} url={url} />
      </li>
      <li>
        <FacebookShare url={url} />
      </li>
      <li>
        <HatenaShare />
      </li>
    </ul>
  );
};
