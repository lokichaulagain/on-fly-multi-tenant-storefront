"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react"; // Import useEffect and useState
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import MobileSheet from "@/components/mobile-sheet";
import { useCart } from "@/contexts/cart-provider";
import { SignedIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import SignInModal from "../auth/sign-in-modal";
import SignUpModal from "../auth/sign-up-modal";
import { useCurrentStore } from "@/contexts/current-store-provider";
import { Banner } from "../banner";

export default function Navbar() {
  const store = useCurrentStore();
  const { cart } = useCart();
  const { user } = useUser();
  const pathname = usePathname();

  // State to track if the user has scrolled
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // User has scrolled down
      } else {
        setIsScrolled(false); // User is at the top
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navitems = [
    { title: "Home", slug: "/" },
    { title: "Categories", slug: "/categories" },
    { title: "Shop", slug: "/shop" },
  ];

  return (
    <div>
      {store.store_appearance?.banner_content && (
        <Banner
          className="bg-[var(--primary)] text-white"
          message={store.store_appearance?.banner_content}
        />
      )}

      {/* Add shadow class conditionally */}
      <nav
        className={`bg-white shadow-sm w-full md:static md:text-sm h-16 flex items-center justify-center sticky top-0 z-50 transition-shadow duration-300 ${
          isScrolled ? "shadow-2xl " : "shadow-none"
        }`}
      >
        <div className="items-center w-full container px-4 md:px-24 mx-auto md:flex">
          <div className="flex items-center justify-between md:block">
            <Link
              prefetch={true}
              href="/"
              className="flex items-center gap-1"
            >
              <Image
                src={store.store_logo}
                alt="logo"
                width={32}
                height={32}
              />
            </Link>

            <div className="flex items-center gap-4">
              <Link
                prefetch={true}
                href="/checkout"
                className=" block md:hidden"
              >
                <div className="relative">
                  <ShoppingCart
                    size={20}
                    className="hover:text-[var(--secondary)] duration-300"
                  />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[var(--secondary)] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      {cart.length}
                    </span>
                  )}
                </div>
              </Link>

              <div className="md:hidden">
                <MobileSheet navitems={navitems} />
              </div>
            </div>
          </div>
          <div className="flex-1 pb-3 mt-8 md:pb-0 md:mt-0 hidden md:block">
            <div className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0 ">
              {/* Display main navigation items and first 4 pages */}
              {navitems.map((item, idx) => (
                <div key={idx}>
                  <Link
                    prefetch={true}
                    href={item.slug}
                    className={`${pathname === item.slug ? " " : ""}  font-medium  text-sm opacity-85`}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}

              <span className="hidden w-px h-6 bg-gray-300 opacity-50 md:block"></span>

              <div className="flex items-center gap-x-2">
                <Link
                  prefetch={true}
                  href="/checkout"
                >
                  <div className="relative">
                    <ShoppingCart
                      size={20}
                      className="hover:text-[var(--secondary)] duration-300"
                    />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[var(--secondary)] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </Link>

                <SignedIn>
                  <Link
                    prefetch={true}
                    href="/profile"
                  >
                    <Button variant="link">
                      <Image
                        src={user?.imageUrl || "/placeholder.svg"}
                        alt="user"
                        height={100}
                        width={100}
                        className="w-8 h-8 rounded-full hover:opacity-80 transition-opacity duration-300 border-2 border-accent"
                      />
                    </Button>
                  </Link>
                </SignedIn>

                <div className="flex items-center gap-x-2">
                  <SignInModal
                    primary_color={store.store_appearance?.primary_color}
                    border_radius={`${(store.store_appearance?.border_radius ?? 0) / 32}rem`}
                    font_family={store.store_appearance?.font_family}
                    store_logo={store.store_logo}
                    store_subdomain={store.store_subdomain}
                    button={
                      <Button
                        variant="link"
                        className="hover:text-[var(--secondary)] duration-300"
                      >
                        Sign In
                      </Button>
                    }
                  />

                  <SignUpModal
                    primary_color={store.store_appearance?.primary_color}
                    border_radius={`${(store.store_appearance?.border_radius ?? 0) / 32}rem`}
                    font_family={store.store_appearance?.font_family}
                    store_logo={store.store_logo}
                    store_subdomain={store.store_subdomain}
                    button={<Button className="bg-[var(--secondary)] hover:bg-[var(--secondary)] duration-300">Sign Up</Button>}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}