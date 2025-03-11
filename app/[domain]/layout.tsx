import { ReactNode } from "react";
import { Metadata } from "next";
import { getActiveStore } from "@/actions/store";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { CartProvider } from "@/contexts/cart-provider";
import { getActiveStorePagesWithPreviewData } from "@/actions/page";
import { IStoreAppearance } from "@/interfaces/store";
import { fallbackMetadata } from "@/constants/metadata";
import { CustomNotFound } from "@/components/not-found/custom-not-found";
import { Store } from "lucide-react";

export async function generateMetadata(): Promise<Metadata | null> {
  const response = await getActiveStore();
  if (response.error || !response.data) {
    return fallbackMetadata;
  }

  const STORE_NAME = response.data.store_name;
  const STORE_META_TITLE = response.data.store_meta_title || STORE_NAME;
  const STORE_META_DESCRIPTION = response.data.store_meta_description || STORE_NAME;
  const LOGO_URL = response.data.store_meta_image || response.data.store_logo || "";
  const BASE_URL = response.data?.custom_domain ? `https://${response.data?.custom_domain}` : `https://${response.data?.store_subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  
  return {
    title: {
      default: STORE_NAME,
      template: "%s | " + STORE_NAME,
    },
    description: STORE_META_DESCRIPTION,
    openGraph: {
      title: STORE_META_TITLE,
      description: STORE_META_DESCRIPTION,
      images: [LOGO_URL],
      url: BASE_URL,
    },

    robots: {
      index: true,
      follow: true,
    },
    twitter: {
      card: "summary_large_image",
      title: STORE_META_TITLE,
      description: STORE_META_DESCRIPTION,
      images: [LOGO_URL],
      creator: "@fenzora",
    },

    icons: {
      icon: LOGO_URL,
      shortcut: LOGO_URL,
      apple: LOGO_URL,
      other: {
        rel: "icon",
        url: LOGO_URL,
      },
    },
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: BASE_URL,
      languages: {
        "en-US": BASE_URL,
      },
    },
  };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  // Fetch both in parallel
  const [storeResponse, pagesResponse] = await Promise.all([getActiveStore(), getActiveStorePagesWithPreviewData()]);
  if (storeResponse.error || !storeResponse.data) {
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
          <Navbar
            store_name={storeResponse.data.store_name}
            store_logo={storeResponse.data.store_logo}
            store_subdomain={storeResponse.data.store_subdomain}
            store_appearance={storeResponse.data.store_appearance as IStoreAppearance}
            pages={pagesResponse.data || []}
          />
        </div>
        <div className="pt-16">{children}</div>
        <Footer
          store={storeResponse.data}
          pages={pagesResponse.data || []}
        />
      </div>
    </CartProvider>
  );
}
