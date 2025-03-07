"use client";
import React, { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IProductPreview } from "@/interfaces/product";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format-currency";

/*
1. memo is used to prevent re-rendering of the component when the same component is used multiple times in the same component.
2. memo is used to optimize the performance of the component.

*/

const SingleProductCard = memo(({ product }: { product: IProductPreview }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate discount percentage only if crossed_price is not null
  const discountPercentage = Math.round(((product.crossed_price - product.selling_price) / product.crossed_price) * 100);

  return (
    <Link
      href={`/shop/${product.slug}`}
      prefetch={true}
      className="space-y-1 group">
      <Card
        className="group overflow-hidden border border-border transition-all duration-300 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Show discount badge only if discountPercentage is greater than 0 */}
          {discountPercentage > 0 && <Badge className="absolute left-3 top-3 bg-[var(--primary)] hover:bg-[var(--primary)] text-xs">{discountPercentage}% OFF</Badge>}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-base line-clamp-2 opacity-90 ">{product.name}</h3>
          <div className="flex items-center gap-2">
            {product.selling_price && <span className="text-lg font-bold">{formatCurrency(product.selling_price)}</span>}
            {product.crossed_price && <span className="text-sm font-semibold line-through text-muted-foreground">{formatCurrency(product.crossed_price)}</span>}
          </div>

          <Button className="w-full gap-2 transition-all bg-[var(--secondary)] mt-4 hover:bg-[var(--secondary)] ">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
});

SingleProductCard.displayName = "SingleProductCard";

export default SingleProductCard;
