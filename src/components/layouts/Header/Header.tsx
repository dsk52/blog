import Link from 'next/link';

import { siteName } from "../../../constants/site"
import { GlobalNav } from "../../ui/GlobalNav/GlobalNav"
import style from './Header.module.css'

const Header = () => (
  <header className={style.header}>
    <div className={style.headerInner}>
      <div className={style.headerContent}>
        <div>
          <h1 className={style.siteTitle}>
            <Link href="/">
              {siteName}
            </Link>
          </h1>
        </div>

        <GlobalNav />
      </div>
    </div>
  </header>
)

export default Header
