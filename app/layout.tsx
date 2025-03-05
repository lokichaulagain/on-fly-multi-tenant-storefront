import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { getActiveStoreAppearance } from "@/actions/store";
import { ActionResponse } from "@/actions";
// import { ThemeProvider } from "@/contexts/theme-provider";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const response = (await getActiveStoreAppearance()) as ActionResponse<any>;
  const storeAppearance = response?.data?.store_appearance || {};

  if (response.error || !storeAppearance) {
    return <div>Error fetching store appearance</div>;
  }

  // console.log(response?.data?.store_appearance, "This is the store appearance from the layout");

  return (
    // <ThemeProvider store_appearance={storeAppearance}>
    <ClerkProvider dynamic>
      <html
        lang="en"
        suppressHydrationWarning>
        <head>
          <style>
            {`
              :root {
                --font-family: ${storeAppearance.font_family};
                --primary: ${storeAppearance.primary_color};
                --secondary: ${storeAppearance.secondary_color};
                --radius: ${20}px;
                
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
