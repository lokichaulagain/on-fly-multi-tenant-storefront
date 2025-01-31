import MiddleBannerSection from "@/components/sections/middle-banner-section";
import FeatureProductSection from "@/components/sections/feature-products-section";
import Navbar from "@/components/sections/navbar";
import NewArrrivalSection from "@/components/sections/new-arrival-section";
import React from "react";
import CategoryCarouselSection from "@/components/sections/category-carousel-section";
import HeroSection from "@/components/sections/hero-section";

export default function Page() {
  return (
    <div className="w-full lg:w-9/12 mx-auto px-4 space-y-12">
      <HeroSection />
      <CategoryCarouselSection />
      <FeatureProductSection />
      <MiddleBannerSection />
      <NewArrrivalSection />
    </div>
  );
}
