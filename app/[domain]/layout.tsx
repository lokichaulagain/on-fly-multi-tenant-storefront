import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { checkStoreExists, getActiveStoreMetadata } from "@/actions/store";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { CartProvider } from "@/contexts/cart-provider";

export async function generateMetadata(): Promise<Metadata | null> {
  const response = await getActiveStoreMetadata();
  const metadata = response.data;
  if (response.error || !metadata) {
    // TODO: Redirect to create store page if store not found or return a fallback Metadata object
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
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   data.customDomain && {
    //     alternates: {
    //       canonical: `https://${data.customDomain}`,
    //     },
    //   }),
  };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  // Get active domain info
  const response = await checkStoreExists();
  if (response.error || response.data !== true) {
    console.log("Domain info not found in SiteLayout");

    //TODO: Redirect to create store page if store not found
    // redirect("https://fenzora.com");
    redirect("/store-not-found");
  }

  const metadataResponse = await getActiveStoreMetadata();
  console.log(metadataResponse, "This is metadata from SiteLayout");

  return (
    <CartProvider>
      <div>
        <div className="fixed w-full z-50">
          <Navbar metadata={metadataResponse.data} />
        </div>
        <div className="pt-16">{children}</div>
        <Footer metadata={metadataResponse.data} />
      </div>
    </CartProvider>
  );
}
