import React from "react";

import MyHead from "../components/Head/Head";
import Page from "../components/layouts/Page/Page";
import AboutPage from '../components/templates/AboutPage';

import type { NextPage } from "next";

const About: NextPage = () => (
  <Page head={
    <MyHead
      title="About"
      description=""
      url="/about"
      pageType='website'
      index='index'
    />
  }>
    <>
      <AboutPage />
    </>
  </Page>
);


export default About;
