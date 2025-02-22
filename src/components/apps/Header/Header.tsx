import { clsx } from "clsx";

import { Container } from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";
import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

import { GlobalNav } from "./GlobalNav/GlobalNav";

export const Header = () => (
  <header className={clsx("tw:mt-4 tw:mb-5")}>
    <Container>
      <div
        className={clsx(
          "tw:flex tw:flex-wrap tw:items-center tw:justify-between",
        )}
      >
        <Heading>
          <AnchorLink
            href={ROUTE.top}
            className={clsx("tw:text-3xl tw:text-primary tw:leading-none")}
          >
            {SITE.name}
          </AnchorLink>
        </Heading>

        <GlobalNav />
      </div>
    </Container>
  </header>
);
