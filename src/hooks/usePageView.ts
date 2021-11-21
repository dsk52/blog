import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

import { existsGaId, pageview } from "../libs/gtag";

export default function usePageview() {
  const router = useRouter();
  useEffect(() => {
    if (!existsGaId) {
      return;
    }
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
}
