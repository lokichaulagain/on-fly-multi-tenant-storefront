import { ReactNode } from "react";
import { Metadata } from "next";
import { getActiveStore } from "@/actions/store";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { CartProvider } from "@/contexts/cart-provider";
import { getActiveStorePagesWithPreviewData } from "@/actions/page";
import { IStoreAppearance } from "@/interfaces/store";
import { NoStoreFound } from "@/components/no-store-found";

export async function generateMetadata(): Promise<Metadata | null> {
  const response = await getActiveStore();

  const fallbackMetadata: Metadata = {
    title: "Fenzora",
    description: "Launch your online store in 60 seconds. Build customize sell and manage —all in one powerful ecommerce platform in Nepal.",
    openGraph: {
      title: "Fenzora",
      description: "Launch your online store in 60 seconds. Build customize sell and manage —all in one powerful ecommerce platform in Nepal.",
      images: ["https://itmpwbjutsadjvzubrmf.supabase.co/storage/v1/object/public/fenzora/logos/Icon-two.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Fenzora",
      description: "Launch your online store in 60 seconds. Build customize sell and manage —all in one powerful ecommerce platform in Nepal.",
      images: ["https://itmpwbjutsadjvzubrmf.supabase.co/storage/v1/object/public/fenzora/logos/Icon-two.png"],
      creator: "@fenzora",
    },
    icons: ["https://itmpwbjutsadjvzubrmf.supabase.co/storage/v1/object/public/fenzora/logos/Icon-two.png"],
    metadataBase: new URL(`https://fenzora.com`),
  };

  if (response.error || !response.data) {
    return fallbackMetadata;
  }

  return {
    title: response.data.store_name,
    description: response.data.store_name,
    openGraph: {
      title: response.data.store_meta_title || response.data.store_name,
      description: response.data.store_meta_description || response.data.store_name,
      images: [response.data.store_meta_image || response.data.store_logo || ""],
    },
    twitter: {
      card: "summary_large_image",
      title: response.data.store_meta_title || response.data.store_name,
      description: response.data.store_meta_description || response.data.store_name,
      images: [response.data.store_meta_image || response.data.store_logo || ""],
      creator: "@fenzora",
    },
    icons: [response.data.store_meta_image || response.data.store_logo || ""],
    metadataBase: new URL(`https://${response.data.store_subdomain}`),
  };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  // Fetch both in parallel
  const [storeResponse, pagesResponse] = await Promise.all([getActiveStore(), getActiveStorePagesWithPreviewData()]);
  if (storeResponse.error || !storeResponse.data) {
    return <NoStoreFound />;
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
