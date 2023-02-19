import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";

import { NAV_ITEM } from "./const";
import s from "./style.module.css";

export const GlobalNav = () => (
  <nav className={s.GlobalNav}>
    {NAV_ITEM.map((item) => (
      <AnchorLink href={item.href} key={item.href}>
        {item.label}
      </AnchorLink>
    ))}
  </nav>
);
