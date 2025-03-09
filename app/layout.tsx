import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { getActiveStore } from "@/actions/store";
import { CurrentStoreProvider } from "@/contexts/current-store-provider";
import { Toaster } from "@/components/ui/sonner";
import { NoStoreFound } from "@/components/no-store-found";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const response = await getActiveStore();

  if (response.error || !response.data) {
    return (
      <html lang="en">
        <body>
          <NoStoreFound />
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider dynamic>
      <CurrentStoreProvider store={response.data}>
        <html lang="en">
          <head>
            <style>
              {`
              :root {
                --font-family: ${response.data.store_appearance?.font_family};
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
            <Toaster />
          </body>
        </html>
      </CurrentStoreProvider>
    </ClerkProvider>
  );
}
