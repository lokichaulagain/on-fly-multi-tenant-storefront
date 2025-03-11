"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import { Products } from "@/lib/db/schema";
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ProductShareBuuttons from "./product-share-buttons";
import AddToCart from "./add-to-cart";

interface ProductInfoProps {
  product: Products;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("UK 8");
  const [selectedColor, setSelectedColor] = useState("White/Yellow");

  const sizes = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];
  const colors = ["White/Yellow", "Black/White", "Grey/Blue", "Red/White"];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-end">
          <ProductShareBuuttons
            shareUrl={`https://loki.fenzora.com/shop/${product.slug}`}
            title={product.name}
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
          <AddToCart product={product} />

          <Button
            variant="outline"
            className="flex-1"
            size="lg">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
