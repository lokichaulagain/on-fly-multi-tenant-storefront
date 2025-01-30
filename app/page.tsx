// import { headers } from "next/headers";
// import HeroSection from "@/components/sections/hero-section";
// import PopularProductsSection from "@/components/sections/popular-products-section";
// import FeatureSection from "@/components/sections/feature-products-section";
// import CategoryCarouselSection from "@/components/sections/category-carousel-section";
// import FeatureProductSection from "@/components/sections/feature-products-section";
// import NewArrrivalSection from "@/components/sections/new-arrival-section";
// import MiddleBannerSection from "@/components/sections/middle-banner-section";

// export default async function Page() {
//   // const headersList = await headers();
//   // const domain = headersList.get("host");
//   // const subdomain = domain?.split(".")[0];
//   // console.log(domain, "This is domain");
//   // console.log(subdomain, "This is subdomain");

//   // if (!subdomain) {
//   //   return null;
//   // }

//   // const getTenantMetaData = cache(() => tenantFetch(subdomain, ["name", "description", "logo", "organization_id"]));
//   // const { data: tenantData, status: tenantStatus, error: tenantError } = await getTenantMetaData();
//   // console.log(tenantData, "tenantData");

//   // if (tenantError || !tenantData) {
//   //   return null;
//   // }

//   // const getCategories = cache(() => categoriesFetch(tenantData?.organization_id, ["id", "name", "is_active", "order", "created_at"]));
//   // const { data, error } = await getCategories();

//   // get organization

//   return (
//     <div className="container mx-auto  ">
//       <HeroSection />
//       <div className=" px-4 md:px-0">
//         <CategoryCarouselSection />
//         <FeatureProductSection />
//         <MiddleBannerSection />
//         <NewArrrivalSection />
//       </div>
//     </div>
//   );
// }

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10 bg-black">
      This is home page
    </div>
  );
}
