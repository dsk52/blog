import { siteName } from "../../../constants/site"

import style from "./Footer.module.css"

const Footer = () => (
  <footer className={style.footer}>
    <div className={style.footerInner}>
      <p className={style.copy}><small>© 2021 {siteName}</small></p>
    </div>
  </footer>
)

export default Footer
