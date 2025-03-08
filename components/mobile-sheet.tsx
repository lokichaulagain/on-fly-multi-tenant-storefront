"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Book, Calendar, Facebook, Handshake, HelpCircle, Instagram, Mail, Menu, MessageSquare, Phone, Shield, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { useCurrentStore } from "@/contexts/current-store-provider";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MobileSheet({ navitems }: { navitems: { title: string; slug: string }[] }) {
  const { user } = useUser();
  const store = useCurrentStore();

  const pathname = usePathname();

  const store_logo = store.store_logo;
  const store_subdomain = store.store_subdomain;
  const primary_color = store.store_appearance?.primary_color;
  const font_family = store.store_appearance?.font_family;
  const border_radius = `${(store.store_appearance?.border_radius ?? 0) / 16}rem`;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="md:hidden bg-[var(--secondary)] text-white">
          <Menu size={16} />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] flex flex-col border-none ">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-center text-primary">
            <Link
              href="/"
              className="flex flex-col items-center">
              <Image
                src={store.store_logo}
                priority
                alt="restronp logo"
                height={200}
                width={200}
                className=" w-56 h-20  object-cover"
              />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className=" py-1">
          <p className="w-full border-t border-dashed border-gray-100" />
        </div>


        <div className="flex flex-col">
          <nav className="flex flex-col">
            {navitems.map((item, index) => {
              const isActive = pathname === item.slug;
              return (
                <Link
                  key={index}
                  href={item.slug}
                  className="font-medium transition-colors">
                  <p className={cn("text-sm p-2", "active:bg-[var(--primary)] active:text-[var(--secondary)]  touch-manipulation", isActive ? " text-[var(--primary)] font-medium" : "  opacity-85")}>{item.title}</p>
                </Link>
              );
            })}
          </nav>
        </div>

        <SignedIn>
          <Link
            href="/profile"
            className="flex items-center gap-2 w-full p-2 bg-secondary rounded-md">
            <Image
              src={user?.imageUrl || "/placeholder.svg"}
              alt="user"
              height={100}
              width={100}
              className="w-8 h-8 rounded-full hover:opacity-80 transition-opacity duration-300"
            />
            <div>
              <p className="text-sm font-medium">{user?.fullName}</p>
              <p className="text-xs">{user?.emailAddresses[0].emailAddress}</p>
            </div>
          </Link>
        </SignedIn>

        <SignedOut>
          <div className=" flex items-center gap-2">
            <SignInButton
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
                  helpPageUrl: "/help",
                  privacyPageUrl: "/privacy-policy",
                  termsPageUrl: "/terms-of-service",
                  logoPlacement: "inside",
                  unsafe_disableDevelopmentModeWarnings: false,
                },
              }}>
              <Button className="bg-[var(--secondary)] hover:bg-[var(--secondary)] w-full">Sign In</Button>
            </SignInButton>

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
                  helpPageUrl: "/help",
                  privacyPageUrl: "/privacy-policy",
                  termsPageUrl: "/terms-of-service",
                  logoPlacement: "inside",
                  unsafe_disableDevelopmentModeWarnings: false,
                },
              }}>
              <Button className="bg-[var(--primary)] hover:bg-[var(--primary)] w-full">Sign Up</Button>
            </SignUpButton>
          </div>
        </SignedOut>

        {/* Footer */}
      </SheetContent>
    </Sheet>
  );
}
