import { ReactNode } from "react";
import { Metadata } from "next";
import { getActiveStore, getActiveStoreMetadata } from "@/actions/store";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { CartProvider } from "@/contexts/cart-provider";

export async function generateMetadata(): Promise<Metadata | null> {
  const response = await getActiveStoreMetadata();
  const metadata = response.data;
  console.log(metadata, "This is metadata from generateMetadata");

  if (response.error || !metadata) {
    return null;
  }

  return {
    title: metadata?.store_name,
    description: metadata?.store_name,
    openGraph: {
      title: metadata.store_meta_title || metadata.store_name,
      description: metadata.store_meta_description || metadata.store_name,
      images: [metadata.store_meta_image || metadata.store_logo || ""],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.store_meta_title || metadata.store_name,
      description: metadata.store_meta_description || metadata.store_name,
      images: [metadata.store_meta_image || metadata.store_logo || ""],
      creator: "@fenzora",
    },
    icons: [metadata.store_meta_image || metadata.store_logo || ""],
    metadataBase: new URL(`https://${metadata.custom_domain}`),
  };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const response = await getActiveStore();
  const store_appearance = response?.data?.store_appearance;

  if (response.error || !response.data || !store_appearance) {
    return <div>Error fetching store appearance</div>;
  }

  return (
    <CartProvider>
      <div>
        <div className="fixed w-full z-50">
          <Navbar
            store_name={response.data.store_name}
            store_logo={response.data.store_logo}
            store_subdomain={response.data.store_subdomain}
            store_appearance={store_appearance}
          />
        </div>
        <div className="pt-16">{children}</div>
        <Footer store={response.data} />
      </div>
    </CartProvider>
  );
}
