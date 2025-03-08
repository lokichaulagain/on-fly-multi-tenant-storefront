import { ReactNode } from "react";
import { Metadata } from "next";
import { getActiveStore } from "@/actions/store";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { CartProvider } from "@/contexts/cart-provider";
import { getActiveStorePagesWithPreviewData } from "@/actions/page";

export async function generateMetadata(): Promise<Metadata | null> {
  const response = await getActiveStore();
  const store = response.data;

  if (response.error || !store) {
    return null;
  }

  return {
    title: store?.store_name,
    description: store?.store_name,
    openGraph: {
      title: store.store_meta_title || store.store_name,
      description: store.store_meta_description || store.store_name,
      images: [store.store_meta_image || store.store_logo || ""],
    },
    twitter: {
      card: "summary_large_image",
      title: store.store_meta_title || store.store_name,
      description: store.store_meta_description || store.store_name,
      images: [store.store_meta_image || store.store_logo || ""],
      creator: "@fenzora",
    },
    icons: [store.store_meta_image || store.store_logo || ""],
    metadataBase: new URL(`https://${store.custom_domain}`),
  };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const response = await getActiveStore();
  const store_appearance = response?.data?.store_appearance;

  if (response.error || !response.data || !store_appearance) {
    return <div>Error fetching store appearance</div>;
  }

  const res = await getActiveStorePagesWithPreviewData();
  const pages = res.data;

  if (res.error || !pages) {
    return <div>Error fetching pages</div>;
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
            pages={pages}
          />
        </div>
        <div className="pt-16">{children}</div>
        <Footer
          store={response.data}
          pages={pages}
        />
      </div>
    </CartProvider>
  );
}
