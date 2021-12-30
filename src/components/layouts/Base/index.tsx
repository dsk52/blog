import React from "react";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import s from './index.module.css'

import type { Props } from "./type";
import type { FC } from 'react';

export const Base: FC<Props> = (props): JSX.Element => (
  <>
    {props.head}
    <Header />
    <main className={s.main}>
      {props.children}
    </main>
    <Footer />
  </>
)
