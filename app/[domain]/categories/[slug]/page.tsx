import { CustomNotFound } from "@/components/not-found/custom-not-found";
import PageBanner from "@/components/page-banner";
import { CircleX } from "lucide-react";
import React from "react";
import { extractCategoryNameFromSlug } from "@/utils/extract-name-from-slug";
import { getActiveStoreProductsWithPreviewDataThatBelongsToCategory } from "@/actions/product";
import { IProductPreview } from "@/interfaces/product";
import SingleProductCard from "@/components/single-product-card";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = extractCategoryNameFromSlug(slug);
  const response = await getActiveStoreProductsWithPreviewDataThatBelongsToCategory(slug);

  if (response.error || !response.data) {
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
      <PageBanner title={categoryName} />

      <div className="w-full container px-4 md:px-24  space-y-4 md:space-y-12 mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {response?.data?.map((product: IProductPreview) => (
            <SingleProductCard
              key={product.slug}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
