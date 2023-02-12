import React from "react";

import s from './index.module.css'
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

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
