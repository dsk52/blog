import type { NextPage } from "next";
import Default from '../components/layouts/Default/Default';
import AboutPage from '../components/templates/AboutPage';

const About: NextPage = () => {
  return (
    <Default>
      <AboutPage />
    </Default>
  );
};

export default About;
