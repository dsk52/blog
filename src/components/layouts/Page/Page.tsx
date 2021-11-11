import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import style from "./Page.module.css"

import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode,
  head: JSX.Element
}

const Page: FC<Props> = (props): JSX.Element => (
  <>
    {props.head}
    <Header />
    <main className={style.main}>
      {props.children}
    </main>
    <Footer />
  </>
)

export default Page
