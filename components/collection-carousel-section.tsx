import { getCollectionsWithProductsPreviewData } from "@/actions/collection";
import ProductCarouselSection from "./product-carousel-section";
import React from "react";

export default async function CollectionCarouselSection() {
  const response = await getCollectionsWithProductsPreviewData();
  console.log(response, "response");

  if (response.error || response.data?.length === 0) {
    console.log("Error fetching collections", response.error);
    return null;
  }

  return (
    <div className=" space-y-12">
      {response.data?.map((collection:any) => (
        <ProductCarouselSection
          key={collection.id}
          title={collection.name}
          products={collection.products}
        />
      ))}
    </div>
  );
}
