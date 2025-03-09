"use client"; // Mark this as a Client Component

import dynamic from "next/dynamic";
import { CurrentStoreProvider } from "@/contexts/current-store-provider";
import { Stores } from "@/lib/db/schema";
// import { Store } from "@/types"; // Adjust the import based on your store type

// Disable server-side rendering for ClerkProvider .
// Authentication is not needed immediately, so we can use dynamic import for ClerkProvider.
// Lazy load the ClerkProvider component to reduce the initial JavaScript bundle size.
const ClerkProvider = dynamic(() => import("@clerk/nextjs").then((mod) => mod.ClerkProvider), {
  ssr: false,
});

// Disable server-side rendering for Toaster.
// Toaster is not needed immediately, so we can use dynamic import for Toaster.
// Lazy load the Toaster component to reduce the initial JavaScript bundle size.
const Toaster = dynamic(() => import("@/components/ui/sonner").then((mod) => mod.Toaster), {
  ssr: false,
});



export default function AppClientWrapper({ store, children }: { store: Stores; children: React.ReactNode }) {
  return (
    <ClerkProvider dynamic>
      <CurrentStoreProvider store={store}>
        {children}
        <Toaster />
      </CurrentStoreProvider>
    </ClerkProvider>
  );
}
