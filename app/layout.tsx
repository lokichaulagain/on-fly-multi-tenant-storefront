import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { getActiveStore } from "@/actions/store";
import { CurrentStoreProvider } from "@/contexts/current-store-provider";
import { Stores } from "@/lib/db/schema";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const response = await getActiveStore();
  const store_appearance = response?.data?.store_appearance;

  if (response.error || !response.data || !store_appearance) {
    return <div>Error fetching store appearance</div>;
  }

  return (
    <ClerkProvider dynamic>
      <CurrentStoreProvider store={response.data}>
        <html
          lang="en"
          suppressHydrationWarning>
          <head>
            <style>
              {`
              :root {
                --font-family: ${store_appearance.font_family};
                --primary: ${store_appearance.primary_color};
                --secondary: ${store_appearance.secondary_color};
                --radius: ${store_appearance.border_radius}px;
                --ring: ${store_appearance.primary_color} 
              }
            `}
            </style>
          </head>
          <body>{children}</body>
        </html>
      </CurrentStoreProvider>
    </ClerkProvider>
  );
}
