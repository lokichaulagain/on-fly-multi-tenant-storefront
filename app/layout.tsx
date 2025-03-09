import "./globals.css";
import { getActiveStore } from "@/actions/store";
import AppClientWrapper from "@/components/app-client-wrapper";
import { NoStoreFound } from "@/components/no-store-found";

// It ensures the page is freshly generated on the server for every user request.
// And offcourse it has performance tradeoffs.
// export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const response = await getActiveStore();

  if (response.error || !response.data) {
    console.error("Failed to fetch active store:", response.error);
    return (
      <html lang="en">
        <body>
          <NoStoreFound />
        </body>
      </html>
    );
  }

  const storeAppearance = response.data.store_appearance;
  const dynamicStyles = `
    :root {
      --font-family: ${storeAppearance?.font_family || "sans-serif"};
      --primary: ${storeAppearance?.primary_color || "#000000"};
      --secondary: ${storeAppearance?.secondary_color || "#ffffff"};
      --radius: ${storeAppearance?.border_radius || "0"}px;
      --ring: ${storeAppearance?.primary_color || "#000000"};
    }
  `;

  return (
    <html lang="en">
      <head>
        <style>{dynamicStyles}</style>
      </head>
      <body>
        <AppClientWrapper store={response.data}>{children}</AppClientWrapper>
      </body>
    </html>
  );
}
