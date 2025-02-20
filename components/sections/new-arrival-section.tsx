import React from "react";
import SingleProductCard from "@/components/single-product-card";
import { IProductPreview } from "@/interfaces/product";
import SectionHeader from "@/components/section-header";

export default function NewArrrivalSection({ products }: { products: IProductPreview[] }) {
  return (
    <div>
      <SectionHeader title="New Arrivals" />
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4  gap-4">
        {products &&
          products.map((product: any) => (
            <SingleProductCard
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </div>
  );
}
