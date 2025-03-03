import React from "react";
import ProductCard from "@/components/product-card";
import SectionHeader from "@/components/section-header";

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
