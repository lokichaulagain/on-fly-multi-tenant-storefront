import React from "react";
import ProductCarouselSection from "./product-carousel-section";
import { IProductPreview } from "@/interfaces/product";

interface FeatureProductSectionProps {
  title: string;
  products: IProductPreview[];
}

export default async function FeatureProductSection({ products }: FeatureProductSectionProps) {
  return (
    <ProductCarouselSection
      title="Featured Products"
      products={products}
    />
  );
}
