import React from "react";
import { getActiveStoreProductsWithPreviewData } from "@/actions/product";
import GridProducts from "@/components/grid-products";

export default async function GridProductSection() {
  const response = await getActiveStoreProductsWithPreviewData();
  const products = response?.data || []

  if (response.error || products?.length === 0) {
    console.log("Error fetching products", response.error);
    return null;
  }

  return (
    <GridProducts
      title="New Arrivals"
      products={products}
    />
  );
}
