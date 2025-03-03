import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { checkStoreExists, getStoreBySubdomain } from "@/actions/store";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { CartProvider } from "@/contexts/cart-provider";

export async function generateMetadata({ params }: { params: { domain: string } }): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const store_subdomain = domain.replace(/^https?:\/\//, "").split(".")[0];
  console.log(store_subdomain, "This is store_subdomain from generateMetadata");

  // Get store by subdomain
  const response = await getStoreBySubdomain(store_subdomain);
  const store = response.data;
  console.log(store, "This is store from generateMetadata");
  if (response.error) {
    return null;
  }

  return {
    title: store?.store_name,
    description: store?.store_name,
    openGraph: {
      title: store?.store_name,
      description: store?.store_name,
      images: [store?.store_logo || ""],
    },
    twitter: {
      card: "summary_large_image",
      title: store?.store_name,
      description: store?.store_name,
      images: [store?.store_logo || ""],
      creator: "@fenzora",
    },
    icons: [store?.store_logo || ""],
    metadataBase: new URL(`https://${store_subdomain}`),
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
    redirect("https://fenzora.com");
  }

  return (
    <CartProvider>
      <div>
        <div className="fixed w-full z-50">
          <Navbar />
        </div>
        <div className="pt-16">{children}</div>
        <Footer />
      </div>
    </CartProvider>
  );
}
