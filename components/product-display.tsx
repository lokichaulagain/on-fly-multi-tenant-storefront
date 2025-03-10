"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import { ICartProduct, useCart } from "@/contexts/cart-provider";
// import { CartSheet } from "@/components/cart-sheet";
import { ShoppingCart, LoaderCircle, Minus, Plus, ChevronRight, Shield, RotateCcw, Truck, ShoppingBag, Heart, Share2, Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/format-currency";
import { Products } from "@/lib/db/schema";
import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import WishListButton from "./wish-list-button";
import ProductShareBuuttons from "./product-share-buttons";

export default function ProductDisplay({ product, shareUrl, title }: { product: Products; shareUrl: string; title: string }) {
  const imageUrls = Array.isArray(product.image_urls) ? product.image_urls : [];

  const [selectedImage, setSelectedImage] = useState(imageUrls[0] || "");
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

  const handleAddToCart = () => {
    setIsAddingToCart(true);

    // Simulate a short loading state

    const toBeSentToCart = {
      id: product.id,
      name: product.name,
      price: product.selling_price,
      crossed_price: product.crossed_price,
      image: imageUrls[0] || "",
    };
    setTimeout(() => {
      addToCart(toBeSentToCart, quantity);
      setIsAddingToCart(false);

      // toast.success("Success!", {
      //   description: `${quantity} × ${product.name} added to your cart`,
      //   action: {
      //     label: "Undo",
      //     onClick: () => console.log("Undo"),
      //   },
      // });

      setQuantity(1);
    }, 300);
  };

  const [mainImage, setMainImage] = useState("/placeholder.svg?height=600&width=600");
  // const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("UK 8");
  const [selectedColor, setSelectedColor] = useState("White/Yellow");
  const [wishlist, setWishlist] = useState(false);

  const thumbnails = ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"];

  const sizes = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];
  const colors = ["White/Yellow", "Black/White", "Grey/Blue", "Red/White"];

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
  };

  return (
    <div className="  ">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-4">
        <Link
          href="/"
          className="text-muted-foreground hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link
          href="/shop/category/shoes"
          className="text-muted-foreground hover:text-primary">
          Shoes
        </Link>

        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link
          href={`/shop/category/${product.slug}`}
          className="text-foreground font-medium">
          {product.name}
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
        {/* Left column: Image gallery */}
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

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="text-xs rounded-full">
                Mens Wears
              </Badge>

              <ProductShareBuuttons
                shareUrl={shareUrl}
                title={title}
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mt-2">{product.name}</h1>

            <div className="flex items-center mt-2 space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(128 reviews)</span>
              <span className="text-sm text-muted-foreground">|</span>
              <span className="text-sm text-green-600">In Stock</span>
            </div>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-2xl md:text-3xl font-bold">{formatCurrency(product.selling_price ?? 0)}</span>
            <span className=" text-base md:text-lg text-muted-foreground line-through">{formatCurrency(product.crossed_price ?? 0)}</span>
            <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100 shadow-none rounded-full border-none">Save {formatCurrency(product.crossed_price ? product.crossed_price - product.selling_price! : 0)}</Badge>
          </div>

          {/* Color Selection */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">
                Color: <span className="text-muted-foreground">{selectedColor}</span>
              </h3>
              <RadioGroup
                defaultValue={selectedColor}
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <div
                    key={color}
                    className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={color}
                      id={`color-${color}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`color-${color}`}
                      className="flex items-center justify-center rounded-sm border border-accent bg-popover px-3 py-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[var(--secondary)]">
                      {color}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-2">
                Size: <span className="text-muted-foreground">{selectedSize}</span>
              </h3>

              <RadioGroup
                defaultValue={selectedSize}
                onValueChange={setSelectedSize}
                className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <div
                    key={size}
                    className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={size}
                      id={`size-${size}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex h-8 w-14 items-center justify-center rounded-sm border border-accent bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[var(--secondary)]">
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  title="Decrease Quantity"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  className="h-8 w-10 rounded-r-none">
                  -
                </Button>
                <div className="h-8 w-12 flex items-center justify-center border-y border-input">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  title="Increase Quantity"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="h-8 w-10 rounded-l-none">
                  +
                </Button>
              </div>
            </div>

            <div className="flex  gap-3">
              <AddToCartSheet product={product} />

              <Button
                variant="outline"
                className="flex-1"
                size="lg">
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* <CartSheet /> */}
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--secondary)] px-4 py-2">
              Description
            </TabsTrigger>

            <TabsTrigger
              value="reviews"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--secondary)] px-4 py-2">
              Reviews (128)
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="description"
            className="pt-6">
            <h3 className="text-lg font-medium mb-4">Product Description</h3>

            <div className="prose prose-lg prose-p:text-lg prose-p:text-muted-foreground max-w-none">{parse(product.description || "")}</div>
          </TabsContent>

          <TabsContent
            value="reviews"
            className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Based on 128 reviews</span>
                  </div>
                </div>
                <Button className="bg-[var(--secondary)] hover:bg-[var(--secondary)] active:bg-[var(--secondary)]">Write a Review</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="md:col-span-2">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-16 text-sm text-muted-foreground">5 stars</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[75%]"></div>
                      </div>
                      <span className="w-12 text-sm text-muted-foreground text-right">75%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-sm text-muted-foreground">4 stars</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[15%]"></div>
                      </div>
                      <span className="w-12 text-sm text-muted-foreground text-right">15%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-sm text-muted-foreground">3 stars</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[5%]"></div>
                      </div>
                      <span className="w-12 text-sm text-muted-foreground text-right">5%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-sm text-muted-foreground">2 stars</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[3%]"></div>
                      </div>
                      <span className="w-12 text-sm text-muted-foreground text-right">3%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-sm text-muted-foreground">1 star</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[2%]"></div>
                      </div>
                      <span className="w-12 text-sm text-muted-foreground text-right">2%</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 space-y-6">
                  {/* Sample Review */}
                  <div className="border-b pb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">John D.</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 5 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-xs text-muted-foreground">Verified Purchase</span>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">2 months ago</span>
                    </div>
                    <p className="mt-3 text-sm">These shoes are amazing! I&apos;ve been wearing Reebok Classics for years and this pair doesnt disappoint. The leather is soft yet durable, and they&apos;re comfortable right out of the box. The white and yellow colorway looks even better in person.</p>
                  </div>

                  {/* Sample Review */}
                  <div className="border-b pb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Sarah M.</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-xs text-muted-foreground">Verified Purchase</span>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">1 month ago</span>
                    </div>
                    <p className="mt-3 text-sm">Great classic sneakers that go with everything. They run true to size and are comfortable for all-day wear. The only reason I&apos;m giving 4 stars instead of 5 is that they took a few days to break in.</p>
                  </div>

                  <Button
                    size="default"
                    variant="outline"
                    className="w-full">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { IProductPreview } from "@/interfaces/product";
import { CartSheetContent } from "./cart-sheet-content";

function AddToCartSheet({ product }: { product: IProductPreview }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const { cart } = useCart();

  const [open, setOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);

    const toBeSentToCart: ICartProduct = {
      id: product.id,
      name: product.name,
      price: product.selling_price,
      crossed_price: product.crossed_price,
      image: product.image_url,
    };
    setTimeout(() => {
      addToCart(toBeSentToCart, 1);
      setIsAddingToCart(false);
      setOpen(true);
    }, 300);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {/* <span className="flex items-center gap-2">
            {isAddingToCart ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            ) : (
              <ShoppingCart size={16} />
            )}
            Add to Cart
          </span> */}

        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          size="lg"
          className="flex-1 bg-[var(--secondary)] hover:bg-[var(--secondary)] active:bg-[var(--secondary)]">
          <span className="flex items-center gap-2">
            {isAddingToCart ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            ) : (
              <ShoppingBag size={16} />
            )}
            Add to Cart
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center">MY CART ({cart.length})</SheetTitle>
        </SheetHeader>
        <CartSheetContent />
      </SheetContent>
    </Sheet>
  );
}
