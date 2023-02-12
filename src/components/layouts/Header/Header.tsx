import Link from 'next/link';

import { GlobalNav } from "@/components/ui/GlobalNav/GlobalNav";
import { ROUTE } from '@/constants/route';
import { SITE } from "@/constants/site";

import style from './Header.module.css'

const Header = () => (
  <header className={style.header}>
    <div className={style.headerInner}>
      <div className={style.headerContent}>
        <div>
          <h1 className={style.siteTitle}>
            <Link href={ROUTE.top}>
              {SITE.name}
            </Link>
          </h1>
        </div>

        <GlobalNav />
      </div>
    </div>
  </header>
)

export default Header
