"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, LogOut, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignOutButton, useUser } from "@clerk/nextjs";
import { useCurrentStore } from "@/contexts/current-store-provider";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCart } from "@/contexts/cart-provider";
import SignUpModal from "./auth/sign-up-modal";
import SignInModal from "./auth/sign-in-modal";

export default function MobileSheet({ navitems }: { navitems: { title: string; slug: string }[] }) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const store = useCurrentStore();
  const pathname = usePathname();

  const store_logo = store.store_logo;
  const store_subdomain = store.store_subdomain;
  const primary_color = store.store_appearance?.primary_color;
  const font_family = store.store_appearance?.font_family;
  const border_radius = `${(store.store_appearance?.border_radius ?? 0) / 16}rem`;

  const handleClose = () => {
    setTimeout(() => setOpen(false), 100); // Delay of 100ms
  };

  const { cart } = useCart();

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu
          size={26}
          className="md:hidden  text-white"
        />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] flex flex-col border-none p-0 ">
        <SheetHeader className=" h-32 bg-[var(--primary)] flex items-center justify-center ">
          <Link
            prefetch={true}
            href="/checkout"
            onClick={handleClose}
            className="absolute top-4 left-4 text-white bg-white/5 rounded-full p-2">
            <div className="relative">
              <ShoppingCart
                size={18}
                className="hover:text-[var(--secondary)] duration-300"
              />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-[var(--secondary)] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">{cart.length}</span>}
            </div>
          </Link>

          <SignedIn>
            <SignOutButton>
              <Button className="text-red-500 bg-red-500/20 rounded-full p-2 absolute top-20 right-1 hover:bg-red-500/30">
                <LogOut size={16} />
              </Button>
            </SignOutButton>
          </SignedIn>

          <SheetTitle className="text-white">
            <Image
              src={store_logo}
              alt={store.store_name}
              width={100}
              height={100}
              className="w-16"
            />
          </SheetTitle>
        </SheetHeader>

        <div className=" px-4 space-y-4">
          <SignedIn>
            <Link
              prefetch={true}
              href="/profile"
              onClick={handleClose}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer bg-accent/50">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.imageUrl || "/placeholder.svg"}
                  alt={user?.fullName || "user avatar"}
                />
                <AvatarFallback>{"Loki".charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                <span className="font-medium">{user?.fullName}</span>
                <span className="text-muted-foreground text-xs">{user?.emailAddresses[0].emailAddress}</span>
              </div>
              <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
          </SignedIn>

          <div className=" flex items-center gap-2">
            <SignInModal
              primary_color={primary_color}
              border_radius={border_radius}
              font_family={font_family}
              store_logo={store_logo}
              store_subdomain={store_subdomain}
              button={
                <Button
                  onClick={handleClose}
                  className="bg-[var(--secondary)] hover:bg-[var(--secondary)] w-full">
                  Sign In
                </Button>
              }
            />

            <SignUpModal
              primary_color={primary_color}
              border_radius={border_radius}
              font_family={font_family}
              store_logo={store_logo}
              store_subdomain={store_subdomain}
              button={
                <Button
                  onClick={handleClose}
                  className="bg-[var(--primary)] hover:bg-[var(--primary)] w-full">
                  Sign Up
                </Button>
              }
            />
          </div>

          <div className=" py-1">
            <p className="w-full border-t border-dashed border-accent" />
          </div>

          <nav className="flex flex-col  ">
            {navitems.map((item, index) => {
              const isActive = pathname === item.slug;
              return (
                <Link
                  prefetch={true}
                  key={index}
                  href={item.slug}
                  onClick={handleClose}
                  className="font-medium transition-colors">
                  <p className={cn("text-sm p-1", "active:text-[var(--secondary)]  touch-manipulation", isActive ? " text-[var(--primary)] font-medium" : "  opacity-85")}>{item.title}</p>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}

        <Link href={"https://fenzora.com"}>
          <SheetFooter className="bg-[var(--primary)] absolute bottom-0 left-0 right-0">
            <p className="text-white text-center p-2 text-[10px]">Powered by Fenzora</p>
          </SheetFooter>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
