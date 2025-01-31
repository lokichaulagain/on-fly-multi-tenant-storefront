import React, { Suspense } from "react";
import "@smastrom/react-rating/style.css";
import ProductDisplay from "@/components/product-display";
import ProductCarouselSection from "@/components/sections/product-carousel-section";
// import ProductCarouselSection from "@/components/website/ProductCarouselSection";
// import { supabase } from "@/utils/something/supabase/supabaseClient";
// import ProductDisplay from "@/components/website/ProductDisplay";
type Props = {};

export default async function Page({ params }: any) {
  const slug = params.slug;
  console.log(slug);

  const product = {
    name: "Product Name",
    thumbnail: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m1_slide_03.jpeg",
    price: "Rs. 1000",
    rating: 4.5,
  }

  const products = [
    {
      id: 1,
      name: "Product 1",
      thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg",
      price: "$100",
      slug: "product-1",
    },
    {
      id: 2,
      name: "Product 2",
      thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_02.jpg",
      price: "$200",
      slug: "product-2",
    },


    {
      id: 3,
      name: "Product 3",
      thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_01.jpg", 
      price: "$300",
      slug: "product-3",
    },


    {
      id: 4,
      name: "Product 4",
      thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg",
      price: "$400",
      slug: "product-4",
    },


    {
      id: 5,
      name: "Product 5",
      thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_02.jpg",
      price: "$500",
      slug: "product-5",
    },


    {
      id: 6,
      name: "Product 6",
      thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_01.jpg",
      price: "$600",
      slug: "product-6",
    },


    {
      id: 7,
      name: "Product 7",
      thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg",
      price: "$700",
      slug: "product-7",

    }
  ]


  return (
    <div className="w-full md:w-9/12 px-4 mx-auto mt-4 md:mt-8">


      <Suspense fallback={<div>Vitra ko Loading...</div>}>
        <div className="w-full md:w-9/12 px-4 mx-auto mt-4 md:mt-8">
          <ProductDisplay product={product} />
          <ProductCarouselSection
            title="We Think You'll Love"
            products={products}
          />
        </div>
      </Suspense>
    </div>
  );
}