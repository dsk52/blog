import React from "react";

import MyHead from "../components/Head/Head";
import { Base } from "../components/layouts/Base";
import AboutPage from "../components/templates/About";

import type { NextPage } from "next";

const About: NextPage = () => (
  <Base head={
    <MyHead
      title="About"
      description=""
      url="/about"
      pageType='website'
      index='index'
    />
  }>
    <AboutPage />
  </Base>
);

export default About;
