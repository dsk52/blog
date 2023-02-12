import MyHead from "@/components/Head/Head";
import { Base } from "@/components/layouts/Base";
import AboutPage from "@/components/templates/About";
import { ROUTE } from "@/constants/route";

import type { NextPage } from "next";

const About: NextPage = () => (
  <Base head={
    <MyHead
      title="About"
      description=""
      url={ROUTE.about}
      pageType='website'
      index='index'
    />
  }>
    <AboutPage />
  </Base>
);

export default About;
