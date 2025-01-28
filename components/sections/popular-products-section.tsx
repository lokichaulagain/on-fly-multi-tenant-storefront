import React from "react";
import SectionHeader from "../ui/section-header";
import ProductCard from "../ui/product-card";

export default function PopularProductsSection() {
  return (
    <div>
      <SectionHeader title="Popular Products" />

      <div className=" grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
}
