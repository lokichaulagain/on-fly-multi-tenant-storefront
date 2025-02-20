"use client";
import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../section-header";
import { ICategoryPreview } from "@/interfaces/category";

export default function CategoryCarouselSection({ categories }: { categories: ICategoryPreview[] }) {
  return (
    <section>
      <SectionHeader title="Explore Categories" />
      <Carousel
        opts={{ align: "start" }}
        className="">
        <CarouselContent>
          {categories?.map((category: ICategoryPreview) => (
            <CarouselItem
              key={category.id}
              className="md:basis-1/2 lg:basis-1/4 group shadow-sm">
              <div className=" relative md:h-92  overflow-hidden rounded-2xl">
                {category.thumbnail && (
                  <Link href={`/shop?collection=${category.slug}`}>
                    <Image
                      src={category.thumbnail}
                      alt={category.name}
                      height={500}
                      width={500}
                      className=" md:h-92 object-cover rounded-2xl  transition-all ease-in-out duration-700 group-hover:scale-105  "
                    />
                  </Link>
                )}
                <div className=" absolute top-4  left-4 group-hover:text-orange-500 duration-300 ">
                  <p className=" font-medium">{category.name}</p>
                  <p className=" text-sm">32 Items</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute z-20 left-0 ml-2" />
        <CarouselNext className="absolute z-20 right-0 mr-2" />
      </Carousel>
    </section>
  );
}
