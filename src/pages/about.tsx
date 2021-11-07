import MyHead from "../components/Head/Head";
import Default from '../components/layouts/Default/Default';
import AboutPage from '../components/templates/AboutPage';

import type { NextPage } from "next";

const About: NextPage = () => (
  <Default head={
    <MyHead
      title="About"
      description=""
      url="/about"
    />
  }>
    <>
      <AboutPage />
    </>
  </Default>
);


export default About;
