import { clsx } from "clsx";

import type { ContainerProps } from "./type";

export const Container = ({ children }: ContainerProps) => (
  <div className={clsx("tw:w-full tw:mx-auto tw:px-5", "tw:md:px-0 tw:md:max-w-5xl")}>
    {children}
  </div>
);
