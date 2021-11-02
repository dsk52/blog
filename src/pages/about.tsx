import MyHead from "../components/Head/Head";
import Default from '../components/layouts/Default/Default';
import AboutPage from '../components/templates/AboutPage';

import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <Default head={
      <MyHead
        title="aaa"
        description="bbb"
        url="/about"
      />
    }>
      <>
        <AboutPage />
      </>
    </Default>
  );
};

export default About;
