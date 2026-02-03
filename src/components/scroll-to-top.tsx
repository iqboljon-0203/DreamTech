"use client";

import { useEffect } from "react";
import { usePathname } from "@/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
