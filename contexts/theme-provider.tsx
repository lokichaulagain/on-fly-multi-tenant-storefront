// providers/theme-provider.tsx
"use client";

import { useEffect } from "react";
import { StoreAppearance } from "@/interfaces/store";

export const ThemeProvider = ({ children, store_appearance }: { children: React.ReactNode; store_appearance: StoreAppearance }) => {
  useEffect(() => {
    if (store_appearance) {
      const root = document.documentElement;
      root.style.setProperty("--font-family", store_appearance.font_family);
      root.style.setProperty("--primary", store_appearance.primary_color);
      root.style.setProperty("--secondary", store_appearance.secondary_color);
      root.style.setProperty("--radius", `${20}px`);
      // Add more CSS variables as needed
    }
  }, [store_appearance]);

  return <>{children}</>;
};
