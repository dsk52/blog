import { clsx } from "clsx";
import type { JSX } from "react";

import { Footer } from "@/components/apps/Footer/Footer";
import { Header } from "@/components/apps/Header/Header";

import type { Props } from "./type";

export const CommonLayout = ({ head, children }: Props): JSX.Element => (
  <>
    {head}
    <Header />
    <main className={clsx("tw:mt-24")}>{children}</main>
    <Footer />
  </>
);
