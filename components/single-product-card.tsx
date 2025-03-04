import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { IProductPreview } from "@/interfaces/product";

/*
1. memo is used to prevent re-rendering of the component when the same component is used multiple times in the same component.
2. memo is used to optimize the performance of the component.

*/

const SingleProductCard = memo(({ product }: { product: IProductPreview }) => {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="space-y-1 group">
      <div className="lg:h-96 rounded-sm overflow-hidden">
        <Image
          src={product.image_url || "/placeholder.svg"}
          alt="product-img"
          height={400}
          width={400}
          layout="responsive"
          loading="lazy"
          className=" lg:h-96 object-cover rounded-sm  transition-all ease-in-out duration-700 group-hover:scale-105"
        />
      </div>
      <p className="transition-colors duration-300 group-hover:text-orange-500">{product.name}</p>
      {/* <p className="text-sm transition-colors duration-300 group-hover:text-orange-500">{product.selling_price}</p>
      <p className="text-sm transition-colors duration-300 group-hover:text-orange-500">{product.crossed_price}</p> */}
    </Link>
  );
});

SingleProductCard.displayName = "SingleProductCard";

export default SingleProductCard;
