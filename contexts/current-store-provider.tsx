"use client";

import { Stores } from "@/lib/db/schema";
import React, { createContext, useContext, ReactNode } from "react";

const CurrentStoreContext = createContext<Stores | undefined>(undefined);

export const CurrentStoreProvider = ({ children, store }: { children: ReactNode; store: Stores }) => {
  return <CurrentStoreContext.Provider value={store}>{children}</CurrentStoreContext.Provider>;
};

export const useCurrentStore = () => {
  const context = useContext(CurrentStoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
