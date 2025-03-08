"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, ShoppingCart } from "lucide-react";
import MobileSheet from "@/components/mobile-sheet";
import { useCart } from "@/contexts/cart-provider";
import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { IStoreAppearance } from "@/interfaces/store";
import { IActiveStorePagesWithPreviewData } from "@/interfaces/page";

export default function Navbar({ store_name, store_logo, store_subdomain, store_appearance, pages }: { store_name: string; store_logo: string; store_subdomain: string; store_appearance: IStoreAppearance; pages: IActiveStorePagesWithPreviewData[] }) {
  const primary_color = store_appearance.primary_color;
  const border_radius = `${store_appearance.border_radius / 16}rem`;
  const font_family = store_appearance.font_family;

  const { cart } = useCart();
  const { user } = useUser();
  const pathname = usePathname();

  const navitems = [
    { title: "Home", slug: "/" },

    { title: "Shop", slug: "/shop" },
    { title: "Cart", slug: "/checkout" },
    ...pages.map((page) => ({
      title: page.title,
      slug: `/p/${page.slug}`,
    })),
  ];

  // Main navigation items (Home and Shop)
  const mainNavItems = [
    { title: "Home", slug: "/" },
    { title: "Shop", slug: "/shop" },
  ];

  // First 4 pages to display directly in navbar
  const visiblePages = pages.slice(0, 3).map((page) => ({
    title: page.title,
    slug: `/p/${page.slug}`,
  }));

  // Remaining pages for dropdown
  const dropdownPages = pages.slice(4);
  const hasDropdownPages = dropdownPages.length > 0;

  // Combined visible navigation items
  const visibleNavItems = [...mainNavItems, ...visiblePages];

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[var(--primary)] shadow-sm w-full md:static md:text-sm h-16 flex items-center justify-center">
      <div className="items-center w-full container px-4 md:px-24 mx-auto md:flex">
        <div className="flex items-center justify-between md:block">
          <Link
            prefetch={true}
            href="/"
            className="flex items-center gap-1 text-white">
            <Image
              src={store_logo}
              alt="logo"
              width={32}
              height={32}
            />
            <p className="text-2xl tracking-wide font-serif">{store_name}</p>
          </Link>

          
          <div className="md:hidden">
            <MobileSheet
              navitems={navitems}
            />
          </div>
        </div>
        <div className="flex-1 pb-3 mt-8 md:pb-0 md:mt-0 hidden md:block">
          <div className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0 text-white">
            {/* Display main navigation items and first 4 pages */}
            {visibleNavItems.map((item, idx) => (
              <div key={idx}>
                <Link
                  prefetch={true}
                  href={item.slug}
                  className={`${pathname === item.slug ? "text-[var(--secondary)]" : "hover:text-[var(--secondary)] duration-300"} font-semibold`}>
                  {item.title}
                </Link>
              </div>
            ))}

            {/* More pages dropdown (only if there are more than 4 pages) */}
            {hasDropdownPages && (
              <div
                className="relative"
                ref={dropdownRef}>
                <button
                  className={`flex items-center gap-1 font-semibold ${dropdownPages.some((page) => pathname === `/p/${page.slug}`) ? "text-[var(--secondary)]" : "hover:text-[var(--secondary)] duration-300"}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}>
                  More
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute z-10 right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800">
                    {dropdownPages.map((page, idx) => (
                      <Link
                        key={idx}
                        href={`/p/${page.slug}`}
                        prefetch={true}
                        onClick={() => setDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm ${pathname === `/p/${page.slug}` ? "bg-gray-100 text-[var(--primary)]" : "hover:bg-gray-100"}`}>
                        {page.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            <span className="hidden w-px h-6 bg-white opacity-50 md:block"></span>

            <div className="flex items-center gap-x-2">
              <Link href="/checkout">
                <div className="relative">
                  <ShoppingCart
                    size={20}
                    className="hover:text-[var(--secondary)] duration-300"
                  />
                  {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-[var(--secondary)] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">{cart.length}</span>}
                </div>
              </Link>

              <SignedIn>
                <Link
                  prefetch={true}
                  href="/profile">
                  <Button variant="link">
                    <Image
                      src={user?.imageUrl || "/placeholder.svg"}
                      alt="user"
                      height={100}
                      width={100}
                      className="w-8 h-8 rounded-full hover:opacity-80 transition-opacity duration-300 border-2 border-gray-200"
                    />
                  </Button>
                </Link>
              </SignedIn>

              <SignedOut>
                <SignInButton
                  mode="modal"
                  forceRedirectUrl="/checkout"
                  appearance={{
                    variables: {
                      colorPrimary: primary_color,
                      borderRadius: border_radius,
                      fontFamily: font_family,
                    },
                    layout: {
                      logoImageUrl: store_logo,
                      logoLinkUrl: `https://${store_subdomain}.fenzora.com`,
                      helpPageUrl: "/help",
                      privacyPageUrl: "/privacy-policy",
                      termsPageUrl: "/terms-of-service",
                      logoPlacement: "inside",
                      unsafe_disableDevelopmentModeWarnings: false,
                    },
                  }}>
                  <Button
                    variant="link"
                    className="hover:text-[var(--secondary)] duration-300">
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton
                  mode="modal"
                  forceRedirectUrl="/checkout"
                  appearance={{
                    variables: {
                      colorPrimary: primary_color,
                      borderRadius: border_radius,
                      fontFamily: font_family,
                    },
                    layout: {
                      logoImageUrl: store_logo,
                      logoLinkUrl: `https://${store_subdomain}.fenzora.com`,
                      helpPageUrl: "/help",
                      privacyPageUrl: "/privacy-policy",
                      termsPageUrl: "/terms-of-service",
                      logoPlacement: "inside",
                      unsafe_disableDevelopmentModeWarnings: false,
                    },
                  }}>
                  <Button className="bg-[var(--secondary)] hover:bg-[var(--secondary)] duration-300">Sign Up</Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
