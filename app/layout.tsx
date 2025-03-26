import "./globals.css";
import { getActiveStoreAppearance } from "@/actions/store";
import { Toaster } from "@/components/ui/sonner";
import { CustomNotFound } from "@/components/not-found/custom-not-found";
import { Store } from "lucide-react";
import { fallbackMetadata } from "@/constants/metadata";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

export async function generateMetadata(): Promise<Metadata> {
  return fallbackMetadata;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const response = await getActiveStoreAppearance();

  if (response.error || !response.data) {
    return (
      <html lang="en">
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
    <html lang="en">
      <head>
        <style>
          {`
              :root {
                --font-family: ${response.data.font_family};  
                --primary: ${response.data.primary_color};
                --secondary: ${response.data.secondary_color};
                --radius: ${response.data.border_radius}px;
                --ring: ${response.data.primary_color} 
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
  );
}
