"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Separator } from "@/components/ui/separator";
import { IProduct } from "@/interfaces/product";
import { useState } from "react";
import parse from "html-react-parser";

export default function ProductDisplay({ product }: { product: IProduct }) {
  const [selectedImage, setSelectedImage] = useState(product.image_urls[0]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Image
          src={selectedImage || product.image_urls[0]}
          alt="product"
          height={500}
          width={1000}
          className="md:h-[70vh] object-cover"
        />
        <Carousel className="w-full mt-2">
          <CarouselContent>
            {product.image_urls.map((item: string, index: number) => (
              <CarouselItem
                key={index}
                className={`p-1 basis-1/4 ${selectedImage === item ? "border border-orange-500" : "border border-white"} h-20 w-20 flex items-center justify-center`}
                onClick={() => handleImageClick(item)}>
           
                  <Image
                    src={item}
                    alt={product.name}
                    height={100}
                    width={100}
                    loading="lazy"
                    className="object-cover cursor-pointer h-20 w-20  "
                  />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <div className="flex items-center gap-2">
          <Rating
            style={{ maxWidth: 90 }}
            readOnly
            value={4.5}
          />
          <span className="text-xs">(3 customer reviews)</span>
        </div>
        <div>
          <span className="text-2xl font-medium">Rs. {product.selling_price}</span>
          <span className="line-through ml-2">Rs. {product.crossed_price}</span>
        </div>
        <Separator />
        <div>{parse(product.description || "")}</div>
      </div>
    </div>
  );
}
