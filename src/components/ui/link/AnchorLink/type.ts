import type { LinkProps } from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type Props = Pick<LinkProps, "href" | "prefetch"> &
  Pick<ComponentProps<"a">, "className" | "target"> & {
    children: ReactNode;
  };
