import React, { Suspense } from "react";
import "@smastrom/react-rating/style.css";
import { getProductBySlug } from "@/actions/product";
import ProductDisplay from "@/components/product-display";
import dynamic from "next/dynamic";
import { Metadata, ResolvingMetadata } from "next";
import { getActiveStore } from "@/actions/store";
import { Button } from "@/components/ui/button";
const YouMayLikeSection = dynamic(() => import("@/components/sections/you-may-like-section"));
const ProductCarouselSkeleton = dynamic(() => import("@/components/skeletons/product-carousel-skeleton"));
const ProductShareButtons = dynamic(() => import("@/components/product-share-buttons"));

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;

  // do in parallel
  const [productResponse, storeResponse] = await Promise.all([getProductBySlug(slug), getActiveStore()]);

  // Fallback metadata if product not found

  if (productResponse.error || !productResponse.data || storeResponse.error || !storeResponse.data) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found",
    };
  }

  const product = productResponse.data;
  const store = storeResponse.data;

  return {
    title: `${product.name} - ${store.store_name}`,
    description: product.description?.substring(0, 160),
    openGraph: {
      title: product.name + " - " + store.store_name,
      description: product.description?.substring(0, 160),
      images:
        product.image_urls?.map((img) => ({
          url: img,
          alt: `${product.name} - ${store.store_name}`,
        })) || [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name + " - " + store.store_name,
      description: product.description?.substring(0, 160),
      images:
        product.image_urls?.map((img) => ({
          url: img,
          alt: `${product.name} - ${store.store_name}`,
        })) || [],
    },
    icons:
      product.image_urls?.map((img) => ({
        url: img,
        alt: `${product.name} - ${store.store_name}`,
      })) || [],
    metadataBase: new URL(`https://${store.store_subdomain}.fenzora.com/shop/${product.slug}`),
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [productResponse, storeResponse] = await Promise.all([getProductBySlug(slug), getActiveStore()]);

  if (productResponse.error || !productResponse.data || storeResponse.error || !storeResponse.data) {
    return <div>Product not found</div>;
  }

  const shareUrl = `https://${storeResponse.data?.store_subdomain}.fenzora.com/shop/${productResponse.data?.slug}`;
  const title = `${productResponse.data?.name} - ${storeResponse.data?.store_name}`;

  return (
    <div className="w-full container px-4 md:px-24  space-y-4 md:space-y-12 mx-auto pt-6">
      <ProductDisplay product={productResponse.data} shareUrl={shareUrl} title={title} />

      <Suspense fallback={<ProductCarouselSkeleton />}>
        <YouMayLikeSection />


      </Suspense>
    </div>
  );
}
