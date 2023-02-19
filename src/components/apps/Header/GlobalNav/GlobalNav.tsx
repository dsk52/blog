import Link from "next/link";

import { NAV_ITEM } from "./const";
import s from "./style.module.css";

export const GlobalNav = () => (
  <nav className={s.GlobalNav}>
    {NAV_ITEM.map((item) => (
      <Link href={item.href} key={item.href}>
        {item.label}
      </Link>
    ))}
  </nav>
);
