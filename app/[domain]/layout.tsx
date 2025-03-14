import { ReactNode } from "react";
import { Metadata } from "next";
import { getActiveStore } from "@/actions/store";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { CartProvider } from "@/contexts/cart-provider";
import { getActiveStorePagesWithPreviewData } from "@/actions/page";
import { fallbackMetadata } from "@/constants/metadata";
import { CustomNotFound } from "@/components/not-found/custom-not-found";
import { Store } from "lucide-react";

export async function generateMetadata(): Promise<Metadata | null> {
  const response = await getActiveStore();
  if (response.error || !response.data) {
    return fallbackMetadata;
  }

  const store = response.data;
  const STORE_NAME = store.store_name;
  const STORE_META_TITLE = store.store_meta_title || STORE_NAME;
  const STORE_META_DESCRIPTION = store.store_meta_description || `Shop online at ${STORE_NAME}`;
  const LOGO_URL = store.store_meta_image || store.store_logo || "";
  const BASE_URL = store.custom_domain ? `https://${store.custom_domain}` : `https://${store.store_subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN || "fenzora.com"}`;

  return {
    title: {
      default: STORE_META_TITLE,
      template: "%s | " + STORE_NAME,
    },
    description: STORE_META_DESCRIPTION,
    keywords: [`${STORE_NAME}`, "online store", "shop"],

    openGraph: {
      title: STORE_META_TITLE,
      description: STORE_META_DESCRIPTION,
      images: LOGO_URL
        ? [
            {
              url: LOGO_URL,
              width: 1200,
              height: 630,
              alt: `${STORE_NAME} - Online Store`,
            },
          ]
        : [],
      url: BASE_URL,
      siteName: STORE_NAME,
      locale: "en_US",
      type: "website",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },

    twitter: {
      card: "summary_large_image",
      title: STORE_META_TITLE,
      description: STORE_META_DESCRIPTION,
      images: LOGO_URL ? [LOGO_URL] : [],
      creator: "@fenzora",
      site: "@fenzora",
    },

    icons: LOGO_URL
      ? {
          icon: [{ url: LOGO_URL }],
          shortcut: LOGO_URL,
          apple: [{ url: LOGO_URL, sizes: "180x180" }],
          other: [{ rel: "icon", url: LOGO_URL }],
        }
      : undefined,

    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: BASE_URL,
      languages: {
        "en-US": BASE_URL,
      },
    },

    viewport: "width=device-width, initial-scale=1",
    applicationName: STORE_NAME,
  };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const pagesResponse = await getActiveStorePagesWithPreviewData();
  if (pagesResponse.error || !pagesResponse.data) {
    return (
      <CustomNotFound
        icon={<Store className="h-6 w-6 text-muted-foreground" />}
        title="No store found"
        description="We couldn't find any store that matches the br provided subdomain or custom domain."
        buttonText="Create New Store"
        buttonLink="https://app.fenzora.com"
      />
    );
  }

  return (
    <CartProvider>
      <div>
        <div className="fixed w-full z-50">
          <Navbar pages={pagesResponse.data || []} />
        </div>
        <div className=" pt-24">{children}</div>
        <Footer pages={pagesResponse.data || []} />
      </div>
    </CartProvider>
  );
}
