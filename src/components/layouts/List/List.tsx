import React from "react";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import s from './List.module.css'

import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode
  head: JSX.Element
}

export const List: FC<Props> = (props): JSX.Element => (
  <>
    {props.head}
    <Header />
    <main className={s.main}>
      {props.children}
    </main>
    <Footer />
  </>
)
