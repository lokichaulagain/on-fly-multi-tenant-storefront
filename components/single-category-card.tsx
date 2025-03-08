import Link from "next/link";
import React, { memo } from "react";
import Image from "next/image";
import { ICategoryPreview } from "@/interfaces/category";

/*
1. memo is used to prevent re-rendering of the component when the same component is used multiple times in the same component.
2. memo is used to optimize the performance of the component.

*/
const SingleCategoryCard = memo(({ category }: { category: ICategoryPreview }) => {
  
  return (
    <div className=" relative md:h-92  overflow-hidden rounded-2xl">
      {category.thumbnail && (
        <Link href={`/shop?collection=${category.slug}`}>
          <Image
            src={category.thumbnail}
            alt={category.name}
            height={300}
            width={300}
            layout="responsive"
            loading="lazy"
            className=" md:h-92 object-cover rounded-2xl  transition-all ease-in-out duration-700 group-hover:scale-105  "
          />
        </Link>
      )}
      <p className=" font-medium absolute top-4  left-4 group-hover:text-orange-500 duration-300 ">{category.name}</p>
    </div>
  );
});

SingleCategoryCard.displayName = "SingleCategoryCard";

export default SingleCategoryCard;
