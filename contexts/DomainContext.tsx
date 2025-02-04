"use client";

import { createContext, useContext, ReactNode } from "react";

interface DomainContextType {
  subdomain: string;
  domain: string;
  storeName: string | null;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export function DomainProvider({ children, subdomain, domain, storeName }: { children: ReactNode; subdomain: string; domain: string; storeName: string | null }) {
  return <DomainContext.Provider value={{ subdomain, domain, storeName }}>{children}</DomainContext.Provider>;
}

export function useDomain() {
  const context = useContext(DomainContext);
  if (context === undefined) {
    throw new Error("useDomain must be used within a DomainProvider");
  }
  return context;
}
