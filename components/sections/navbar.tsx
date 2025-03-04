"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Package, ShoppingCart } from "lucide-react";
import MobileSheet from "@/components/mobile-sheet";
import { useCart } from "@/contexts/cart-provider";
import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar({ metadata }: { metadata: any }) {
  const { cart } = useCart();
  const { isSignedIn, user } = useUser();

  const pathname = usePathname();
  // const { subdomain, domain, storeName } = useDomain();

  // Replace / paths with your paths
  const navigation = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/shop" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white border-b shadow-sm w-full md:static md:text-sm md:border-none h-16 flex items-center justify-center   ">
      <div className="items-center w-full container px-4 md:px-24 mx-auto md:flex">
        <div className="flex items-center justify-between    md:block">
          <Link
            href="/"
            className=" flex items-center gap-1 text-primary">
            <Image src={metadata?.store_logo} alt="logo" width={32} height={32} />
            <p className=" text-2xl tracking-wide font-serif ">{metadata?.store_name}</p>
          </Link>
          <div className="md:hidden">
            <MobileSheet navigation={navigation} />
          </div>
        </div>
        <div className="flex-1  pb-3 mt-8  md:pb-0 md:mt-0  hidden md:block">
          <div className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className=" hover:text-primary font-semibold">
                  <Link
                    href={item.path}
                    className={`${pathname === item.path ? " text-primary" : ""}`}>
                    {item.title}
                  </Link>
                </div>
              );
            })}
            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <div className="flex items-center gap-x-2">
              <Link href={"/checkout"}>
                <div className="relative">
                  <ShoppingCart />
                  {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{cart.length}</span>}
                </div>
              </Link>

              <SignedIn>
                <Link href="/profile">
                  <Button variant={"link"}>
                    <Image
                      src={user?.imageUrl || "/placeholder.svg"}
                      alt="user"
                      height={100}
                      width={100}
                      className="w-8 h-8 rounded-full hover:opacity-80 transition-opacity duration-300  border-2 border-gray-200"
                    />
                  </Button>
                </Link>
              </SignedIn>

              <SignedOut>
                <SignInButton
                  mode="modal"
                  forceRedirectUrl={"/checkout"}>
                  <Button variant={"link"}>Sign In</Button>
                </SignInButton>
                <SignUpButton
                  mode="modal"
                  forceRedirectUrl={"/checkout"}>
                  <Button>Sign Up</Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        </div>
        {/* <div>
          Current Store: {storeName}
          <br />
          Subdomain: {subdomain}
          <br />
          Domain: {domain}
        </div> */}
      </div>
    </nav>
  );
}
