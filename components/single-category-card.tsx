import Link from "next/link";
import React, { memo } from "react";
import Image from "next/image";
import { ICategoryPreview } from "@/interfaces/category";

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
            loading="eager"
            priority={true}
            className=" md:h-92 object-cover rounded-2xl  transition-all ease-in-out duration-700 group-hover:scale-105  "
          />
        </Link>
      )}
      <p className="prose line-clamp-2 text-sm md:text-base font-medium absolute top-2 md:top-4 left-2 md:left-4 group-hover:text-orange-500 duration-300 ">{category.name}</p>
    </div>
  );
});

SingleCategoryCard.displayName = "SingleCategoryCard";

export default SingleCategoryCard;
