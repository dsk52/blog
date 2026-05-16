"use client";
import "nprogress/nprogress.css";

import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";

export const useTransition = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== null) {
      NProgress.done();
    }
  }, [pathname]);

  useEffect(() => {
    const shouldTrackNavigation = (anchor: HTMLAnchorElement) => {
      if (anchor.target && anchor.target !== "_self") {
        return false;
      }

      const currentUrl = new URL(window.location.href);
      const nextUrl = new URL(anchor.href);

      return currentUrl.origin === nextUrl.origin && currentUrl.href !== nextUrl.href;
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || !shouldTrackNavigation(anchor)) {
        return;
      }

      NProgress.start();
    };

    const handlePageShow = () => {
      NProgress.done();
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);
};
