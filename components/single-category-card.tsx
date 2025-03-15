import Link from "next/link";
import React, { memo } from "react";
import Image from "next/image";
import { ICategoryPreview } from "@/interfaces/category";
import { ArrowRight } from "lucide-react";

const SingleCategoryCard = memo(({ category }: { category: ICategoryPreview }) => {
  return (
    <div className="  md:h-92  overflow-hidden group rounded-sm">
        <Link href={`/categories/${category.slug}`} className="flex items-center justify-center">
          <Image
            src={category.thumbnail || "/placeholder.svg"}
            alt={category.name}
            height={300}
            width={300}
            loading="eager"
            priority={true}
            className=" md:h-92 w-full object-cover rounded-sm  transition-all ease-in-out duration-700 group-hover:scale-105 border border-gray-100    "
          />
        </Link>
      <p className="  text-base  opacity-100 z-10  font-medium  ml-2 mt-2 flex items-center gap-1   ">
        <span>{category.name}</span>{" "}
        <ArrowRight
          size={16}
          className=" mt-1 group-hover:translate-x-1 transition-all ease-in-out duration-700"
        />{" "}
      </p>
    </div>
  );
});

SingleCategoryCard.displayName = "SingleCategoryCard";

export default SingleCategoryCard;
