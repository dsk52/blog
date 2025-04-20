import type { ElementType, JSX, ReactNode } from "react";

export type HeadingProps = {
  as?: ElementType<headingTagTypes>;
  className?: string;
  children: ReactNode;
};

type headingTagTypes =
  | JSX.IntrinsicElements["h1"]
  | JSX.IntrinsicElements["h2"]
  | JSX.IntrinsicElements["h3"]
  | JSX.IntrinsicElements["h4"]
  | JSX.IntrinsicElements["h5"];
