import React from "react";
import SingleProductCard from "@/components/single-product-card";
import SectionHeader from "@/components/section-header";
import { getActiveStoreProductsWithPreviewData } from "@/actions/product";

export default async function NewArrrivalSection() {
  const response = await getActiveStoreProductsWithPreviewData();
  const products = response?.data;

  if (response.error || !products) {
    return <p>No products found</p>;
  }
  return (
    <div>
      <SectionHeader title="New Arrivals" />
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4  gap-4">
        {products?.map((product: any) => (
          <SingleProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
