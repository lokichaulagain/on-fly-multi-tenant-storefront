import React, { Suspense } from "react";
import "@smastrom/react-rating/style.css";
import { getProductBySlug } from "@/actions/product";
import ProductDisplay from "@/components/product-display";
import dynamic from "next/dynamic";

const NewArrrivalSection = dynamic(() => import("@/components/sections/new-arrival-section"), {
  loading: () => {
    return <div>Loading...</div>;
  },
});

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getProductBySlug(slug);
  console.log("prefetch data here", response);

  if (response.error || !response.data) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container w-full md:w-9/12 mx-auto space-y-8 md:space-y-12">
      <ProductDisplay product={response.data} />

      

      <Suspense fallback={<div> Loading...</div>}>
        <NewArrrivalSection />
      </Suspense>
    </div>
  );
}
