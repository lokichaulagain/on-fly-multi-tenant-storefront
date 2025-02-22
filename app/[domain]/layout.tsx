
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import { notFound, redirect } from "next/navigation";

import { Metadata } from "next";
import { getStoreBySubdomain } from "@/actions/store";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { DomainProvider } from '@/contexts/DomainContext';
import { CartProvider } from "@/contexts/cart-provider";

// export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata | null> {
export async function generateMetadata({ params }: any): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  console.log(domain, "This is domain");
  const subdomain = domain.replace(/^https?:\/\//, "").split(".")[0];
  // const data = await getSiteData(domain);
  console.log(subdomain, "This is subdomain");
  const response = await getStoreBySubdomain(subdomain);
  console.log(response, "This is response");
  if (response.error) {
    return null;
  }
  // const {
  //   name: title,
  //   description,
  //   image,
  //   logo,
  // } = data as {
  //   name: string;
  //   description: string;
  //   image: string;
  //   logo: string;
  // };

  // const { store_name, store_subdomain, store_phone_number } = response.data;

  return {
    title: response.data?.store_name,
    description: response.data?.store_name,
    openGraph: {
      title: response.data?.store_name,
      description: response.data?.store_name,
      // images: [response.data?.store_logo],
    },
    twitter: {
      card: "summary_large_image",
      title: response.data?.store_name,
      description: response.data?.store_name,
      // images: [response.data?.store_logo],
      creator: "@fenzora",
    },
    // icons: [response.data?.store_logo],
    metadataBase: new URL(`https://${subdomain}`),
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   data.customDomain && {
    //     alternates: {
    //       canonical: `https://${data.customDomain}`,
    //     },
    //   }),
  };
}

// export default async function SiteLayout({ params, children }: { params: { domain: string }; children: ReactNode }) {
export default async function SiteLayout({ params, children }: any) {
  const domain = decodeURIComponent(params.domain);
  // const subdomain = domain.replace(/^https?:\/\//, "").split(".")[0];
  const subdomain = "loki";

  const response = await getStoreBySubdomain(subdomain);

  if (response.error) {
    notFound();
  }

  return (
    <DomainProvider
      subdomain={subdomain}
      domain={domain}
      storeName={response.data?.store_name || null}
    > <CartProvider>
      <div>
        <div className="fixed w-full z-50">
          <Navbar />
        </div>
        <div className="pt-16">{children}</div>
        <Footer />
      </div>
    </CartProvider>
    </DomainProvider>
  );
}
