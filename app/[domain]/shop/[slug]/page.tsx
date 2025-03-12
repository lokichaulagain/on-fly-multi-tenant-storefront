import React, { Suspense } from "react";
import "@smastrom/react-rating/style.css";
import { getProductBySlug } from "@/actions/product";
import ProductDisplay from "@/components/product-detail/product-display";
import dynamic from "next/dynamic";
import { Metadata, ResolvingMetadata } from "next";
import { getActiveStore } from "@/actions/store";
import { CustomNotFound } from "@/components/not-found/custom-not-found";
import { PackageSearch } from "lucide-react";
const YouMayLikeSection = dynamic(() => import("@/components/sections/you-may-like-section"));
const ProductCarouselSkeleton = dynamic(() => import("@/components/skeletons/product-carousel-skeleton"));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const [productResponse, storeResponse] = await Promise.all([getProductBySlug(slug), getActiveStore()]); // do in parallel

  // If product not found, return fallback metadata
  if (productResponse.error || !productResponse.data) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const product = productResponse.data;
  const STORE_NAME = storeResponse?.data?.store_name;
  const TITLE = product.name + " - " + STORE_NAME;
  const DESCRIPTION = product.description?.substring(0, 160);
  const BASE_URL = storeResponse?.data?.custom_domain ? `https://${storeResponse?.data?.custom_domain}` : `https://${storeResponse?.data?.store_subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      images:
        product.image_urls?.map((img) => ({
          url: img,
          alt: `${product.name} - ${STORE_NAME}`,
        })) || [],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images:
        product.image_urls?.map((img) => ({
          url: img,
          alt: `${product.name} - ${STORE_NAME}`,
        })) || [],
    },
    icons:
      product.image_urls?.map((img) => ({
        url: img,
        alt: `${product.name} - ${STORE_NAME}`,
      })) || [],
    metadataBase: new URL(`${BASE_URL}/shop/${product.slug}`),
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getProductBySlug(slug);

  if (response.error || !response.data) {
    return (
      <CustomNotFound
        icon={<PackageSearch className="h-6 w-6 text-muted-foreground" />}
        title="No product found"
        description="We couldn't find any product that matches the provided slug."
        buttonText="Go Home"
        buttonLink="/"
        buttonbg="bg-[var(--primary)] "
      />
    );
  }

  return (
    <div className="w-full container px-4 md:px-24  space-y-4 md:space-y-12 mx-auto pt-6">
      <ProductDisplay product={response.data} />

      <Suspense fallback={<ProductCarouselSkeleton />}>
        <YouMayLikeSection />
      </Suspense>
    </div>
  );
}
