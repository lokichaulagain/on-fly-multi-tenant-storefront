import { LoaderCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const HeroSection = dynamic(() => import("@/components/sections/hero-section"), {
  loading: () => {
    return <div>Loading...</div>;
  },
});
const CategoryCarouselSection = dynamic(() => import("@/components/sections/category-carousel-section"), {
  loading: () => {
    return <div>Loading...</div>;
  },
});
const FeatureProductSection = dynamic(() => import("@/components/sections/feature-products-section"), {
  loading: () => {
    return <div>Loading...</div>;
  },
});

const NewArrrivalSection = dynamic(() => import("@/components/sections/new-arrival-section"), {
  loading: () => {
    return <div>Loading...</div>;
  },
});

export default async function Page() {
  return (
    <div className="w-full container  md:px-24 mx-auto space-y-4 md:space-y-12 ">
      <Suspense
        fallback={
          <LoaderCircle
            size={16}
            className="animate-spin"
          />
        }>
        <HeroSection />
      </Suspense>

      <div className=" px-4 md:px-0 space-y-4 md:space-y-12 ">
        <Suspense
          fallback={
            <LoaderCircle
              size={16}
              className="animate-spin"
            />
          }>
          <CategoryCarouselSection />
        </Suspense>

        <Suspense
          fallback={
            <LoaderCircle
              size={16}
              className="animate-spin"
            />
          }>
          <FeatureProductSection />
        </Suspense>

        <Suspense
          fallback={
            <LoaderCircle
              size={16}
              className="animate-spin"
            />
          }>
          <NewArrrivalSection />
        </Suspense>
      </div>
    </div>
  );
}
