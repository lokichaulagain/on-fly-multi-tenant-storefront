"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Products } from "@/lib/db/schema";
import WishListButton from "../wish-list-button";

interface ProductImageGalleryProps {
  product: Products;
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const imageUrls = Array.isArray(product.image_urls) ? product.image_urls : [];

  const [selectedImage, setSelectedImage] = useState(imageUrls[0] || "");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [mainCarouselApi, setMainCarouselApi] = useState<CarouselApi>();

  //   // Calculate discount percentage

  // Connect thumbnail selection with main carousel
  useEffect(() => {
    if (!mainCarouselApi) return;
    const handleSelect = () => {
      const selectedIndex = mainCarouselApi.selectedScrollSnap();
      setSelectedIndex(selectedIndex);
      setSelectedImage(imageUrls[selectedIndex] || "");
    };

    mainCarouselApi.on("select", handleSelect);

    return () => {
      mainCarouselApi.off("select", handleSelect);
    };
  }, [mainCarouselApi, imageUrls]);

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    mainCarouselApi?.scrollTo(index);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row ">
      {/* Thumbnail carousel left side */}
      <div className="hidden lg:block w-20">
        <div className="relative h-[500px]">
          <ScrollArea className="h-full pr-2">
            <div className="space-y-2">
              {imageUrls.map((item: string, index: number) => (
                <div
                  key={index}
                  className={`relative aspect-square overflow-hidden cursor-pointer transition-all 
                      ${selectedIndex === index ? "ring-2 ring-[var(--primary)] ring-offset-2" : "hover:ring-1 hover:ring-[var(--primary)] hover:ring-offset-1"}`}
                  onClick={() => handleImageClick(item, index)}>
                  <Image
                    src={item || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main image display */}
      <div className="flex-1">
        <Carousel
          setApi={setMainCarouselApi}
          opts={{
            loop: true,
            containScroll: false,
          }}>
          <CarouselContent>
            {imageUrls.map((item: string, index: number) => (
              <CarouselItem key={index}>
                <Image
                  src={item || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  height={500}
                  width={500}
                  priority={index === 0}
                  className="w-full h-[300px] md:h-[500px]"
                />

                <div className="absolute top-2 right-2">
                  <WishListButton product_id={product.id} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Mobile/tablet thumbnail carousel */}
        <Carousel className="w-full lg:hidden mt-4">
          <CarouselContent>
            {imageUrls.map((item: string, index: number) => (
              <CarouselItem
                key={index}
                className="basis-1/4 md:basis-1/5">
                <div
                  className={` rounded-sm cursor-pointer transition-all
                      ${selectedIndex === index ? "ring-2 ring-[var(--primary)] ring-offset-2" : "hover:ring-1 hover:ring-[var(--primary)] hover:ring-offset-1"}`}
                  onClick={() => handleImageClick(item, index)}>
                  <Image
                    src={item || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover aspect-square rounded-sm"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
