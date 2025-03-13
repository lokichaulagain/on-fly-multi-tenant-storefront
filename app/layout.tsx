import "./globals.css";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { getActiveStore } from "@/actions/store";
import { CurrentStoreProvider } from "@/contexts/current-store-provider";
import { Toaster } from "@/components/ui/sonner";
import { CustomNotFound } from "@/components/not-found/custom-not-found";
import { Store } from "lucide-react";
import { fallbackMetadata } from "@/constants/metadata";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({
  weight: "400",
  subsets: ["vietnamese"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return fallbackMetadata;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const response = await getActiveStore();
  if (response.error || !response.data) {
    return (
      <html
        lang="en"
        className={roboto.className}>
        <body>
          <CustomNotFound
            icon={<Store className="h-6 w-6 text-muted-foreground" />}
            title="No store found"
            description="This store is not active or does not exist."
            buttonText="Create New Store"
            buttonLink="https://app.fenzora.com"
          />
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider dynamic>
      <CurrentStoreProvider store={response.data}>
        <html
          lang="en"
          className={roboto.className}>
          <head>
            <style>
              {`
              :root {
                // --font-family: ${response.data.store_appearance?.font_family}; 
                --primary: ${response.data.store_appearance?.primary_color};
                --secondary: ${response.data.store_appearance?.secondary_color};
                --radius: ${response.data.store_appearance?.border_radius}px;
                --ring: ${response.data.store_appearance?.primary_color} 
              }
            `}
            </style>
          </head>
          <body>
            {children}
            <Analytics />
            <Toaster />
          </body>
        </html>
      </CurrentStoreProvider>
    </ClerkProvider>
  );
}
