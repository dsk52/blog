import type { ComponentProps, ReactNode } from "react";

export type Props = Pick<ComponentProps<"a">, "href" | "className" | "target"> & {
  children: ReactNode;
};
