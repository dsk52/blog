import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import style from "./Page.module.css"

import type { Props } from "./type";


const Page = ({ head, children }: Props): JSX.Element => (
  <>
    {head}
    <Header />
    <main className={style.main}>
      {children}
    </main>
    <Footer />
  </>
)

export default Page
