import MiddleBannerSection from "@/components/sections/middle-banner-section";
import FeatureProductSection from "@/components/sections/feature-products-section";
import Navbar from "@/components/sections/navbar";
import NewArrrivalSection from "@/components/sections/new-arrival-section";
import React from "react";
import CategoryCarouselSection from "@/components/sections/category-carousel-section";
import HeroSection from "@/components/sections/hero-section";
import { getCategoriesBySubdomain, getProductsBySubdomain } from "@/actions/store";
import { getDomainInfo } from '@/utils/get-domain-info';

export default async function Page() {
  const { subdomain } = await getDomainInfo();
  
  // Fetch both categories and products in parallel
  const [categoriesResponse, productsResponse] = await Promise.all([
    getCategoriesBySubdomain(subdomain),
    getProductsBySubdomain(subdomain)
  ]);

  const categories = categoriesResponse?.data || [];
  const products = productsResponse?.data || [];
  console.log(products, "products")
  
  return (
    <div className="w-full lg:w-9/12 mx-auto px-4 space-y-12">
      <HeroSection />
      <CategoryCarouselSection categories={categories} />
      <FeatureProductSection products={products} />
      <MiddleBannerSection />
      <NewArrrivalSection />
    </div>
  );
}
