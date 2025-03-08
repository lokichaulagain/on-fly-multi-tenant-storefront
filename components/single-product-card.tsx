"use client";
import React, { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IProductPreview } from "@/interfaces/product";
import { LoaderCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format-currency";
import { ICartProduct, useCart } from "@/contexts/cart-provider";
import { toast } from "sonner";
import { CartSheet } from "./cart-sheet";

const SingleProductCard = memo(({ product }: { product: IProductPreview }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate discount percentage only if crossed_price and selling_price are not null
  const discountPercentage = product.crossed_price !== null && product.selling_price !== null ? Math.round(((product.crossed_price - product.selling_price) / product.crossed_price) * 100) : 0;

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();

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

      toast.success("Success!", {
        description: `${product.name} added to your cart`,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }, 400);
  };

  return (
    <div className="space-y-1 group">
      <div
        className="group overflow-hidden border border-border transition-all duration-300 hover:shadow-md rounded-[var(--radius)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <Link
          href={`/shop/${product.slug}`}
          prefetch={true}>
          <div className="relative aspect-square overflow -hidden">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
            />
            {/* Show discount badge only if discountPercentage is greater than 0 */}
            {discountPercentage > 0 && <Badge className="absolute right-2 top-2 bg-[var(--primary)] hover:bg-[var(--primary)] text-[10px]">{discountPercentage}% OFF</Badge>}
          </div>

          <div className="p-4">
            <h3 className="font-medium text-sm md:text-base line-clamp-2 opacity-80">{product.name}</h3>
            <div className="flex items-center gap-2">
              {product.selling_price !== null && <span className="text-lg font-bold opacity-90">{formatCurrency(product.selling_price)}</span>}
              {product.crossed_price !== null && <span className="text-sm font-semibold line-through text-muted-foreground">{formatCurrency(product.crossed_price)}</span>}
            </div>
          </div>
        </Link>

        <div className="px-4 pb-4">
          <Button
            className="w-full gap-2 transition-all bg-[var(--secondary)]  hover:bg-[var(--secondary)]"
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
      <CartSheet  />
    </div>
  );
});

SingleProductCard.displayName = "SingleProductCard";

export default SingleProductCard;
