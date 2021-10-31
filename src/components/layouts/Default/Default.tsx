import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import style from "./Default.module.css"

import type { FC } from "react";

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
