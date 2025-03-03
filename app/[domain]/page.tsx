import MiddleBannerSection from "@/components/sections/middle-banner-section";
import FeatureProductSection from "@/components/sections/feature-products-section";
import NewArrrivalSection from "@/components/sections/new-arrival-section";
import React from "react";
import CategoryCarouselSection from "@/components/sections/category-carousel-section";
import HeroSection from "@/components/sections/hero-section";
import { getActiveStoreProductsWithPreviewData } from "@/actions/product";
import { getActiveStoreCategoriesWithPreviewData } from "@/actions/category";

export default async function Page() {
  const categoriesResponse = await getActiveStoreCategoriesWithPreviewData();
  const productsResponse = await getActiveStoreProductsWithPreviewData();

  const categories = categoriesResponse?.data || [];
  const products = productsResponse?.data || [];
  console.log(products, "products");

  return (
    <div className="w-full container px-4 md:px-24 mx-auto space-y-12">
      <HeroSection />
      <CategoryCarouselSection categories={categories || []} />
      <FeatureProductSection products={products || []} />
      <MiddleBannerSection />
      <NewArrrivalSection products={products || []} />
    </div>
  );
}
