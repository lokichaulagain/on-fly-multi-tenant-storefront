import MiddleBannerSection from "@/components/sections/middle-banner-section";
import FeatureProductSection from "@/components/sections/feature-products-section";
import NewArrrivalSection from "@/components/sections/new-arrival-section";
import React from "react";
import CategoryCarouselSection from "@/components/sections/category-carousel-section";
import HeroSection from "@/components/sections/hero-section";
import { getCategoriesByStoreId } from "@/actions/store";
import { getDomainInfo } from "@/utils/get-domain-info";
import { getProductsByStoreId } from "@/actions/product";
import { IProductPreview } from "@/interfaces/product";
import { ICategoryPreview } from "@/interfaces/category";

export default async function Page() {
  const { subdomain, storeData } = await getDomainInfo();
  console.log(storeData, "storeData");

  // Fetch both categories and products in parallel
    const [categoriesResponse, productsResponse] = await Promise.all([getCategoriesByStoreId(storeData?.id || ""), getProductsByStoreId(storeData?.id || "")]);

  const categories = categoriesResponse?.data || [];
  const products = productsResponse?.data || [];
  console.log(products, "products");

  return (
    <div className="w-full lg:w-9/12 mx-auto px-4 space-y-12">
      <HeroSection />
      <CategoryCarouselSection categories={categories as ICategoryPreview[]} />
      <FeatureProductSection products={products as IProductPreview[]} />
      <MiddleBannerSection />
      <NewArrrivalSection products={products as IProductPreview[]} />
    </div>
  );
}
