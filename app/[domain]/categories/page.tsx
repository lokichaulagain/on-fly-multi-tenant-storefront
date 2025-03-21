import { getActiveStoreCategoriesWithPreviewData } from "@/actions/category";
import { CustomNotFound } from "@/components/not-found/custom-not-found";
import PageBanner from "@/components/page-banner";
import SingleCategoryCard from "@/components/single-category-card";
import { ICategoryPreview } from "@/interfaces/category";
import { CircleX, Package } from "lucide-react";
import React from "react";

export default async function Page() {
  const response = await getActiveStoreCategoriesWithPreviewData();
  const categories = response.data;

  if (response.error || !categories) {
    return (
      <CustomNotFound
        icon={<CircleX className="text-red-400" />}
        title="Oops! Something went wrong."
        description="Please try again later."
        buttonText="Go Home"
        buttonLink="/"
        buttonbg="bg-[var(--primary)]"
      />
    );
  }

  return (
    <div>
      <PageBanner
        title="Categories"
        description="Explore our categories"
      />

      {categories?.length === 0 && (
        <CustomNotFound
          className=""
          icon={<Package />}
          title="Oops! Admin has not added any category yet"
          description="Please check back later."
          buttonText="Go Home"
          buttonLink="/"
        />
      )}

      {categories?.length !== 0 && (
        <div className="w-full container px-4 md:px-24  space-y-4 md:space-y-12 mx-auto ">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories?.map((category: ICategoryPreview) => (
              <SingleCategoryCard
                key={category.slug}
                category={category}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
