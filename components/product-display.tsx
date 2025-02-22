"use client";

import { useState } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { Separator } from "@/components/ui/separator";
import type { IProduct } from "@/interfaces/product";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-provider";
import { CartSheet } from "@/components/cart-sheet";

export default function ProductDisplay({ product }: { product: IProduct }) {
  const [selectedImage, setSelectedImage] = useState(product.image_urls[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-md">
          <Image
            src={selectedImage || product.image_urls[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {product.image_urls.map((item: string, index: number) => (
              <CarouselItem
                key={index}
                className="basis-1/4 md:basis-1/5">
                <div
                  className={`p-1 ${selectedImage === item ? "border-2 border-primary" : ""} cursor-pointer`}
                  onClick={() => handleImageClick(item)}>
                  <Image
                    src={item || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover aspect-square rounded-md"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        {/* <div className="flex items-center gap-2">
          <Rating
            style={{ maxWidth: 100 }}
            readOnly
            value={4.5}
          />
          <span className="text-sm text-muted-foreground">(3 customer reviews)</span>
        </div> */}
        <div>
          <span className="text-3xl font-semibold">Rs. {product.selling_price}</span>
          <span className="text-xl text-muted-foreground line-through ml-2">Rs. {product.crossed_price}</span>
        </div>
        <Separator />
        <div className="prose max-w-none">{parse(product.description || "")}</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
              -
            </Button>
            <span className="px-4">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity((prev) => prev + 1)}>
              +
            </Button>
          </div>
          <Button
            size="lg"
            onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
      <CartSheet />
    </div>
  );
}
