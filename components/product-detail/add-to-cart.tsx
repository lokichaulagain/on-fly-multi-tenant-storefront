"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ICartProduct, useCart } from "@/contexts/cart-provider";
import { useState } from "react";
import { Button } from "../ui/button";
import { LoaderCircle, ShoppingBag } from "lucide-react";
import { CartSheetContent } from "@/components/cart-sheet-content";
import { Products } from "@/lib/db/schema";

interface AddToCartProps {
  product: Products;
}

export default function AddToCart({ product }: AddToCartProps) {
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
      image: product.image_urls?.[0] || "",
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
        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          size="lg"
          className="flex-1  active:bg-[var(--secondary)]">
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
