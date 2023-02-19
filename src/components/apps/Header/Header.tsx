import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";
import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

import { GlobalNav } from "./GlobalNav/GlobalNav";
import style from "./Header.module.css";

export const Header = () => (
  <header className={style.header}>
    <div className={style.headerInner}>
      <div className={style.headerContent}>
        <div>
          <h1 className={style.siteTitle}>
            <AnchorLink href={ROUTE.top}>{SITE.name}</AnchorLink>
          </h1>
        </div>

        <GlobalNav />
      </div>
    </div>
  </header>
);
