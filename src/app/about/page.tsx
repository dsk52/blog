import type { Metadata } from "next";

import { AboutPage } from "@/components/page/About/About";
import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

const url = `${SITE.url}${ROUTE.about}`;

export const metadata: Metadata = {
  title: "About",
  openGraph: {
    title: "About",
    url,
    type: "website",
  },
  alternates: {
    canonical: url,
  },
};

export default AboutPage;
