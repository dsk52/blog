import Footer from "@/components/layouts/Footer/Footer";
import Header from "@/components/layouts/Header/Header";

import s from './index.module.css'

import type { Props } from "./type";

export const Base = ({ head, children }: Props): JSX.Element => (
  <>
    {head}
    <Header />
    <main className={s.main}>
      {children}
    </main>
    <Footer />
  </>
)
