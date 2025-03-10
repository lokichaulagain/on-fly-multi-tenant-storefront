import React from "react";
import ProductCarouselSection from "./product-carousel-section";
import { getActiveStoreProductsWithPreviewData } from "@/actions/product";

export default async function FeatureProductSection() {
  const response = await getActiveStoreProductsWithPreviewData();
  const products = response?.data || []

  if (response.error || products?.length === 0) {
    console.log("Error fetching products", response.error);
    return null;
  }


  return (
    <ProductCarouselSection
      title="Featured Productsss"
      products={products}
    />
  );
}
