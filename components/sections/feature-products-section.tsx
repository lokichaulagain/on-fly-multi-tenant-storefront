import React from "react";
import SectionHeader from "@/components/section-header";
import SingleProductCard from "@/components/single-product-card";
import { IProductPreview } from "@/interfaces/product";
import { getActiveStoreProductsWithPreviewData } from "@/actions/product";

export default async function FeatureProductSection() {
  const response = await getActiveStoreProductsWithPreviewData();
  const products = response?.data;

  if (response.error || !products) {
    return <p>No products found</p>;
  }
  
  return (
    <div>
      <SectionHeader title="Feature Products" />
      <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {products?.map((product: IProductPreview) => (
          <SingleProductCard
            key={product.slug}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
