"use server";
import { cache } from "react";
import { categoriesFetch, tenantFetch } from "@/actions/category";
import { headers } from "next/headers";
import HeroSection from "@/components/sections/hero-section";
import FeatureCategorySection from "@/components/sections/feature-category-section";
import PopularProductsSection from "@/components/sections/popular-products-section";
import FeatureSection from "@/components/sections/feature-products-section";
import CategoryCarouselSection from "@/components/sections/category-carousel-section";
import FeatureProductSection from "@/components/sections/feature-products-section";
import NewArrrivalSection from "@/components/sections/new-arrival-section";
import MiddleBannerSection from "@/components/sections/middle-banner-section";

export default async function Page() {
  // const headersList = await headers();
  // const domain = headersList.get("host");
  // const subdomain = domain?.split(".")[0];

  // if (!subdomain) {
  //   return null;
  // }

  // const getTenantMetaData = cache(() => tenantFetch(subdomain, ["name", "description", "logo", "organization_id"]));
  // const { data: tenantData, status: tenantStatus, error: tenantError } = await getTenantMetaData();
  // console.log(tenantData, "tenantData");

  // if (tenantError || !tenantData) {
  //   return null;
  // }

  // const getCategories = cache(() => categoriesFetch(tenantData?.organization_id, ["id", "name", "is_active", "order", "created_at"]));
  // const { data, error } = await getCategories();

  // get organization

  return (
    <div className="w-full lg:w-9/12 mx-auto px-4 space-y-12">
      <HeroSection/>
      <CategoryCarouselSection/>
      <FeatureProductSection/>
      <MiddleBannerSection/>
      <NewArrrivalSection/>

      {/* <FeatureProductSection/> */}
      {/* <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <ul className="space-y-2"> */}
        {/* {data?.map((category: any) => (
          <li
            key={category.id}
            className="p-2 bg-gray-50 rounded-md">
            {category.name}
          </li>
        ))} */}
      {/* </ul> */}
    </div>
  );
}
