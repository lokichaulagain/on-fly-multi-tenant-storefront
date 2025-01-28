import React from "react";
type Props = {
  product: any;
};

import Image from "next/image";
import Link from "next/link";

export default function SingleProductCard({ product }: Props) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="space-y-1 group">
      <div className="lg:h-96 rounded-sm overflow-hidden">
        <Image
          src={product.thumbnail}
          alt="product-img"
          height={800}
          width={800}
          className=" lg:h-96 object-cover rounded-sm  transition-all ease-in-out duration-700 group-hover:scale-105"
        />
      </div>
      <p className="transition-colors duration-300 group-hover:text-orange-500">{product.name}</p>
      <p className="text-sm transition-colors duration-300 group-hover:text-orange-500">{product.price}</p>
    </Link>
  );
}