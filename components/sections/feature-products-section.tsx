import React from "react";
import SectionHeader from "../section-header";
import SingleProductCard from "../single-product-card";

export default function FeatureProductSection({ products }: any) {
  // const products = [
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg",
  //     price: "$100",
  //     slug: "product-1",
  //   },
  //   {
  //     id: 2,
  //     name: "Product 2",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_02.jpg",
  //     price: "$200",
  //     slug: "product-2",
  //   },

  //   {
  //     id: 3,
  //     name: "Product 3",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_01.jpg",
  //     price: "$300",
  //     slug: "product-3",
  //   },

  //   {
  //     id: 4,
  //     name: "Product 4",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg",
  //     price: "$400",
  //     slug: "product-4",
  //   },

  //   {
  //     id: 5,
  //     name: "Product 5",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_02.jpg",
  //     price: "$500",
  //     slug: "product-5",
  //   },

  //   {
  //     id: 6,
  //     name: "Product 6",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_01.jpg",
  //     price: "$600",
  //     slug: "product-6",
  //   },

  //   {
  //     id: 7,
  //     name: "Product 7",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg",
  //     price: "$700",
  //     slug: "product-7",

  //   }
  // ]

  return (
    <div>
      <SectionHeader title="Feature Products" />
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
