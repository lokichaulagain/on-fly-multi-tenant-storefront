"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-provider";
import { CartSheet } from "@/components/cart-sheet";
import { ShoppingCart, LoaderCircle, Minus, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/format-currency";
import { Products } from "@/lib/db/schema";

export default function ProductDisplay({ product }: { product: Products }) {
  const imageUrls = Array.isArray(product.image_urls) ? product.image_urls : [];

  const [selectedImage, setSelectedImage] = useState(imageUrls[0] || '');
  const [selectedIndex, setSelectedIndex] = useState(0); 
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();

  const [mainCarouselApi, setMainCarouselApi] = useState<CarouselApi>();

  //   // Calculate discount percentage
  const discountPercentage = product.crossed_price !== null && product.selling_price !== null ? Math.round(((product.crossed_price - product.selling_price) / product.crossed_price) * 100) : 0;

  // Connect thumbnail selection with main carousel
  useEffect(() => {
    if (!mainCarouselApi) return;
    const handleSelect = () => {
      const selectedIndex = mainCarouselApi.selectedScrollSnap();
      setSelectedIndex(selectedIndex);
      setSelectedImage(imageUrls[selectedIndex] || '');  
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

  const handleAddToCart = () => {
    setIsAddingToCart(true);

    // Simulate a short loading state

    const toBeSentToCart = {
      id: product.id,
      name: product.name,
      price: product.selling_price,
      crossed_price: product.crossed_price,
      image: imageUrls[0] || '',
    };
    setTimeout(() => { 
      addToCart(toBeSentToCart, quantity);
      setIsAddingToCart(false);

      toast.success("Success!", {
        description: `${quantity} × ${product.name} added to your cart`,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });

      setQuantity(1);
    }, 400);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
      {/* Left column: Image gallery */}

      <div className="flex flex-col-reverse lg:flex-row gap-4">
        {/* Thumbnail carousel left side */}
        <div className="hidden lg:block w-24">
          <div className="relative h-[500px]">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-2">
                {imageUrls.map((item: string, index: number) => (
                  <div
                    key={index}
                    className={`relative aspect-square rounded-md overflow-hidden cursor-pointer transition-all 
                      ${selectedIndex === index ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-primary/30 hover:ring-offset-1"}`}
                    onClick={() => handleImageClick(item, index)}>
                    <Image
                      src={item || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover rounded-[var(--radius)]"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Main image display */}
        <div className="flex-1 space-y-4">
          <Carousel
            className="w-full"
            setApi={setMainCarouselApi}
            opts={{
              loop: true,
              containScroll: false,
            }}>
            <CarouselContent>
              {imageUrls.map((item: string, index: number) => (
                <CarouselItem
                  key={index}
                  className="relative overflow-hidden">
                  <Image
                    src={item || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    height={500}
                    width={600}
                    priority={index === 0}
                    className="object-cover h-[500px] w-[600px] rounded-[var(--radius)]"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:block left-2   h-6 w-6 bg-[var(--secondary)] hover:bg-[var(--secondary)] active:bg-[var(--secondary)] text-white border-none" />
            <CarouselNext className="hidden md:block right-2  h-6 w-6 bg-[var(--secondary)] hover:bg-[var(--secondary)] active:bg-[var(--secondary)] text-white border-none" />
          </Carousel>

          {/* Mobile/tablet thumbnail carousel */}
          <Carousel className="w-full lg:hidden px-4">
            <CarouselContent>
              {imageUrls.map((item: string, index: number) => (
                <CarouselItem
                  key={index}
                  className="basis-1/4 md:basis-1/5">
                  <div
                    className={` rounded-md cursor-pointer transition-all
                      ${selectedIndex === index ? "ring-2 ring-primary ring-offset-1" : "hover:ring-1 hover:ring-primary/30"}`}
                    onClick={() => handleImageClick(item, index)}>
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

            <CarouselPrevious className="left-2  h-6 w-6 bg-[var(--secondary)] hover:bg-[var(--secondary)] active:bg-[var(--secondary)] text-white border-none" />
            <CarouselNext className="right-2  h-6 w-6 bg-[var(--secondary)] hover:bg-[var(--secondary)] active:bg-[var(--secondary)] text-white border-none" />
          </Carousel>
        </div>
      </div>

      {/* Right column: Product details */}
      <div className="space-y-2 px-4">
        <p className=" text-base font-medium md:text-lg opacity-50 ">Mens Wears</p>
        <p className="text-2xl md:text-3xl font-semibold opacity-80 ">{product.name}</p>
        <p className="text-2xl md:text-3xl font-semibold opacity-85 ">
          <span className=" line-through font-medium text-lg opacity-50">{formatCurrency(product.crossed_price ?? 0)}</span> {formatCurrency(product.selling_price ?? 0)}
        </p>
        <div className=" py-4">
          <p className="w-full border-t border-dashed border-gray-300" />
        </div>
        <div className=" line-clamp-[10]  opacity-70">{parse(product.description || "")}</div>
        <div className=" py-4">
          <p className="w-full border-t border-dashed border-gray-300  " />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center ">
            <button
              type="button"
              title="Decrease Quantity"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="p-1 rounded-full border hover:bg-gray-50">
              <Minus size={16} />
            </button>
            <span className="text-sm w-8 text-center">{quantity}</span>

            <button
              type="button"
              title="Increase Quantity"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="p-1 rounded-full border hover:bg-gray-50">
              <Plus size={16} />
            </button>
          </div>

          <Button
            className=" bg-[var(--secondary)] hover:bg-[var(--secondary)"
            onClick={handleAddToCart}
            disabled={isAddingToCart}>
            {isAddingToCart ? (
              <span className="flex items-center gap-2">
                <LoaderCircle
                  size={16}
                  className="animate-spin"
                />
                Adding to cart...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShoppingCart size={16} />
                Add to Cart
              </span>
            )}
          </Button>
        </div>
      </div>

      <CartSheet />
    </div>
  );
}
