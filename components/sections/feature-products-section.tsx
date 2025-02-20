import React from "react";
import SectionHeader from "../section-header";
import SingleProductCard from "../single-product-card";
import { IProductPreview } from "@/interfaces/product";

export default function FeatureProductSection({ products }: { products: IProductPreview[] }) {
  return (
    <div>
      <SectionHeader title="Feature Products" />
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4  gap-4">
        {products &&
          products.map((product: IProductPreview) => (
            <SingleProductCard
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </div>
  );
}
