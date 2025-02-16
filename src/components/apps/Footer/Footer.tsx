import { clsx } from "clsx";

import { Container } from "@/components/ui/Container/Container";
import { SITE } from "@/constants/site";

export const Footer = () => (
  <footer className={clsx("tw:box-border tw:pt-3 tw:pb-8")}>
    <Container>
      <p className={clsx("tw:text-center")}>
        <small className={clsx("tw:text-sm")}>© 2021 {SITE.name}</small>
      </p>
    </Container>
  </footer>
);
