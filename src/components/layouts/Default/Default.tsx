import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import style from "./Default.module.css"

import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode,
  head: JSX.Element
}

const Default: FC<Props> = (props): JSX.Element => (
  <>
    {props.head}
    <Header />
    <main className={style.main}>
      {props.children}
    </main>
    <Footer />
  </>
)

export default Default
