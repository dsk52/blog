import { FC } from "react";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import style from "./Default.module.css"

const Default: FC = (props) => (
  <>
    <Header />
    <main className={style.main}>
      {props.children}
    </main>
    <Footer />
  </>
)

export default Default
