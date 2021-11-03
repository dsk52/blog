import MyHead from "../components/Head/Head";
import Default from '../components/layouts/Default/Default';

import type { NextPage } from "next";

const Index: NextPage = () => {
  return <Default head={
    <MyHead
      title="aaa"
      description="bbb"
      url="/about"
    />
  }>
    Index
  </Default>;
};

export default Index;