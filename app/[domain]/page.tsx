const CategoryCarouselSection = dynamic(() => import("@/components/sections/category-carousel-section"));
const GridProductSection = dynamic(() => import("@/components/sections/grid-product-section"));
const FeatureProductSection = dynamic(() => import("@/components/feature-product-section"));
import CategoryCarouselSkeleton from "@/components/skeletons/category-carousel-skeleton";
import ProductCarouselSkeleton from "@/components/skeletons/product-carousel-skeleton";
import GridProductsSkeleton from "@/components/skeletons/grid-products-sekelton";
const HeroSection = dynamic(() => import("@/components/sections/hero-section"));
import { LoaderCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="w-full container px-4 md:px-24  space-y-4 md:space-y-12 mx-auto ">
      <Suspense
        fallback={
          <LoaderCircle
            size={16}
            className="animate-spin"
          />
        }>
        <HeroSection />
      </Suspense>

      <div className="space-y-4 md:space-y-12 ">
        <Suspense fallback={<CategoryCarouselSkeleton />}>
          <CategoryCarouselSection />
        </Suspense>

        <Suspense fallback={<ProductCarouselSkeleton />}>
          <FeatureProductSection />
        </Suspense>

        <Suspense fallback={<GridProductsSkeleton />}>
          <GridProductSection />
        </Suspense>
      </div>
    </div>
  );
}
