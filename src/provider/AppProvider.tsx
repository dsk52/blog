'use client'
import { type ReactNode, useTransition } from "react";

import { useInitTagManager } from "@/hooks/useInitTagManager";
import { GTM_ID } from "@/libs/gtm";

export function AppProvider({ children }: { children: ReactNode }) {
  useInitTagManager({ gtmId: GTM_ID });
  useTransition();

  return (
    <>{children}</>
  )
}
