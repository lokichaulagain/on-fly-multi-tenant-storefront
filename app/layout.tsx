import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { getActiveStoreAppearance } from "@/actions/store";
import { ActionResponse } from "@/actions";
// import { ThemeProvider } from "@/contexts/theme-provider";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const response = (await getActiveStoreAppearance()) as ActionResponse<any>;
  const store_appearance = response?.data || {};

  if (response.error || !store_appearance) {
    return <div>Error fetching store appearance</div>;
  }

  console.log(response?.data?.store_appearance, "This is the store appearance from the layout");

  return (
    // <ThemeProvider store_appearance={store_appearance}>
    <ClerkProvider dynamic>
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
    </ClerkProvider>
    // </ThemeProvider>
  );
}
