import React, { Suspense } from "react";
import "@smastrom/react-rating/style.css";
import { getProductBySlug } from "@/actions/product";
import ProductDisplay from "@/components/product-display";
import { IProduct } from "@/interfaces/product";
import SimilarProductSection from "@/components/sections/similar-product-section";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getProductBySlug(slug);
  console.log("prefetch data here", response);
  
  if (response.error || !response.data) {
    return <div>Product not found</div>;
  }

  return (
    <div className="w-full md:w-9/12 px-4 mx-auto mt-4 md:mt-8">
      <ProductDisplay product={response.data as IProduct} />
      <Suspense fallback={<div>Vitra ko Loading...</div>}>
        <SimilarProductSection />
      </Suspense>
    </div>
  );
}
