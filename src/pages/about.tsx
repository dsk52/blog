import Default from '../components/layouts/Default/Default';
import AboutPage from '../components/templates/AboutPage';

import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <Default>
      <AboutPage />
    </Default>
  );
};

export default About;
