"use client";

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-provider";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignedOut, SignUpButton } from "@clerk/nextjs";
import { useCurrentStore } from "@/contexts/current-store-provider";
import { formatCurrency } from "@/lib/format-currency";

export function CartSheet() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const totalPrice = cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);

  const store = useCurrentStore();

  const store_logo = store.store_logo;
  const store_subdomain = store.store_subdomain;
  const primary_color = store.store_appearance?.primary_color;
  const border_radius = `${(store.store_appearance?.border_radius ?? 0) / 16}rem`;
  const font_family = store.store_appearance?.font_family;


  return (
    <Sheet
    open={isCartOpen}
    onOpenChange={setIsCartOpen}
    >
      {/* <SheetTrigger>
        <Button variant="outline">Add to cart </Button>
      </SheetTrigger> */}

      <SheetContent className=" w-10/12">
        <SheetHeader>
          <SheetTitle className=" text-center">MY CART ({cart.length})</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-4">
          {/* Promotions Banner */}
          <div className="flex items-center justify-between bg-emerald-50 p-2 text-xs text-emerald-800 rounded-md">
            <div className="flex gap-4">
              <span className="flex items-center gap-1">✓ Free Shipping</span>
              <span className="flex items-center gap-1">✓ 5% off</span>
              <span className="flex items-center gap-1">✓ 8% off</span>
            </div>
            <span>Mystery Gift ✨</span>
          </div>

          {/* Subscription Banner */}
          <div className="bg-stone-50 p-2 rounded-md flex items-center justify-between text-xs">
            <p>
              Sign up to get <span className="font-semibold">10% off</span> on your first order.
            </p>

            <SignedOut>
              <SignUpButton
                mode="modal"
                forceRedirectUrl={"/checkout"}
                appearance={{
                  variables: {
                    colorPrimary: primary_color,
                    borderRadius: border_radius,
                    fontFamily: font_family,
                  },

                  layout: {
                    logoImageUrl: store_logo,
                    logoLinkUrl: `https://${store_subdomain}.fenzora.com`,
                    helpPageUrl: "/p/help",
                    privacyPageUrl: "/p/privacy-policy",
                    termsPageUrl: "/p/terms-of-service",
                    logoPlacement: "inside",
                    unsafe_disableDevelopmentModeWarnings: false,
                  },
                }}>
                <Button className="bg-[var(--secondary)] hover:bg-[var(--secondary)] duration-300">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-2 border-b pb-2 border-gray-100">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={100}
                  height={100}
                  quality={50}
                  loading="eager"
                  className="object-cover h-20 w-20 rounded-md"
                />
                <div className=" space-y-2">
                  <h3 className="text-sm font-medium ">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      title="Decrease Quantity"
                      onClick={() => decreaseQuantity(item.id)}
                      className="p-1 rounded-full border hover:bg-gray-50">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm w-8 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      title="Increase Quantity"
                      onClick={() => increaseQuantity(item.id)}
                      className="p-1 rounded-full border hover:bg-gray-50">
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      title="Remove Item"
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-500 hover:text-red-700 ml-2">
                      Remove
                    </button>
                  </div>

                  <p className="text-xs font-medium">
                    {formatCurrency(item.price || 0)} x {item.quantity} = {(item.price || 0) * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className=" mt-6">
          <div className="flex justify-between text-sm font-medium ">
            <p>Subtotal:</p>
            <p>{formatCurrency(totalPrice)}</p>
          </div>

          <div className="flex justify-between text-sm font-medium ">
            <p>Shipping:</p>
            <p>Rs. 0</p>
          </div>

          <div className="flex justify-between text-base font-medium border-b border-gray-100 pb-2">
            <p>Total:</p>
            <p>{formatCurrency(totalPrice)}</p>
          </div>
        </div>

        <SheetFooter className=" absolute bottom-0 left-0 right-0 w-full ">
          <div className=" flex items-center gap-4 mt-4 w-full px-4  py-2 bg-gray-50">
            <div className="flex gap-2 text-sm font-medium w-full cursor-text">
              <p>Total (Rs): </p>
              <p>{formatCurrency(totalPrice)}</p>
            </div>
            <Link
              href={"/checkout"}
              className="w-full">
              <Button
                type="button"
                className="w-full bg-[var(--secondary)] hover:bg-[var(--secondary)] text-white">
                Checkout
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
