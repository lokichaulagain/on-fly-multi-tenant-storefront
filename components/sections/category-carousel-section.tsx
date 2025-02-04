"use client";
import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../section-header";
import { useDomain } from "@/contexts/DomainContext";
import { getCategoriesBySubdomain } from "@/actions/store";
import { useEffect } from "react";

// Add interface for category type
interface Category {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  user_id: string;
  store_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  sort_order: number | null;
}

export default function CategoryCarouselSection({ params }: any) {
  const { subdomain, domain, storeName } = useDomain();
  // Explicitly type the state
  const [categories, setCategories] = React.useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoriesBySubdomain(subdomain);
        console.log(response, "This is response");
          setCategories(response?.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [subdomain]);

  // const categories = [
  //   {
  //     id: 1,
  //     name: "Category 1",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg",
  //   },

  //   {
  //     id: 2,
  //     name: "Category 2",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_02.jpg",
  //   },

  //   {
  //     id: 3,
  //     name: "Category 3",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_01.jpg",
  //   },

  //   {
  //     id: 4,
  //     name: "Category 4",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg",
  //   },

  //   {
  //     id: 5,
  //     name: "Category 5",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_02.jpg",
  //   },

  //   {
  //     id: 6,
  //     name: "Category 6",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_01.jpg",
  //   },

  //   {
  //     id: 7,
  //     name: "Category 7",
  //     thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg",
  //   },
  // ];
  return (
    <section>
      <SectionHeader title="Explore Categories" />
      <Carousel
        opts={{
          align: "start",
        }}
        className="">
        <CarouselContent>
          {categories.map((category: any) => (
            <CarouselItem
              key={category.id}
              className="md:basis-1/2 lg:basis-1/4 group shadow-sm">
              <div className=" relative md:h-92  overflow-hidden rounded-2xl">
                {category.thumbnail && (
                  <Link href={`/shop?collection=${category.id}`}>
                    <Image
                      src={category.thumbnail}
                      alt="category-img"
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
        <CarouselPrevious className=" absolute z-20 left-0 ml-2" />
        <CarouselNext className=" absolute z-20 right-0 mr-2" />
      </Carousel>
    </section>
  );
}
