"use client";
import Link from "next/link";
import { ChevronRight, Facebook, Instagram, MapPin, Youtube, Zap } from "lucide-react";
import Image from "next/image";
import { useCurrentStore } from "@/contexts/current-store-provider";
import { GradientBlurBackground } from "../gradient-blur-background";
import PowerByFenzora from "../power-by-fenzora";

export default function Footer() {
  const store = useCurrentStore();
  const quickLinks = [
    {
      title: "Home",
      href: "/",
    },

    {
      title: "Categories",
      href: "/categories",
    },

    {
      title: "Shop",
      href: "/shop",
    },

    {
      title: "Cart",
      href: "/checkout",
    },
  ];

  const helpLinks = [
    {
      title: "Help",
      href: "/p/help",
    },
    {
      title: "Privacy Policy",
      href: "/p/privacy-policy",
    },

    {
      title: "Terms of Service",
      href: "/p/terms-of-service",
    },

    {
      title: "Shipping & Returns",
      href: "/p/shipping-returns",
    },
  ];

  const socialLinks = [
    {
      title: "Facebook",
      icon: (
        <Facebook
          size={16}
          className=" text-blue-700"
        />
      ),
      href: store?.social_links?.facebook_url,
      show: store?.social_links?.facebook_url,
    },
    {
      title: "Instagram",
      icon: (
        <Instagram
          size={16}
          className=" text-pink-500"
        />
      ),
      href: store?.social_links?.instagram_url,
      show: store?.social_links?.instagram_url,
    },
    {
      title: "WhatsApp",
      icon: (
        <IconWhatsApp
          size={16}
          className="text-green-500"
        />
      ),
      href: store?.social_links?.primary_whatsapp_number,
      show: store?.social_links?.primary_whatsapp_number,
    },

    {
      title: "Google Map",
      icon: (
        <MapPin
          size={16}
          className="text-blue-700"
        />
      ),
      href: store?.social_links?.google_map_url,
      show: store?.social_links?.google_map_url,
    },

    {
      title: "TikTok",
      icon: (
        <IconTiktok
          size={16}
          className="text-purple-500"
        />
      ),
      href: store?.social_links?.tiktok_url,
      show: store?.social_links?.tiktok_url,
    },

    {
      title: "Youtube",
      icon: (
        <Youtube
          size={16}
          className="text-red-500"
        />
      ),
      href: store?.social_links?.youtube_url,
      show: store?.social_links?.youtube_url,
    },
  ];

  return (
    <footer className="mt-16">
      <GradientBlurBackground className=" py-12 px-0">
        <div className="relative z-10 container mx-auto px-4 md:px-24 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className=" col-span-4 sm:col-span-4 lg:col-span-1">
            <div className="bg-white/5 p-3 inline-block rounded-lg  shadow-inner">
              <Image
                src={store?.store_logo || "/placeholder.svg"}
                alt="logo"
                width={32}
                height={32}
              />
            </div>
            <p className=" text-sm ">{store?.store_meta_description}</p>
          </div>

          <div className="col-span-4 sm:col-span-1 space-y-4 ">
            <h4 className="font-medium text-white">Quick Links</h4>
            <div className=" space-y-2 text-xs font-light ">
              {quickLinks.map((link, index) => (
                <Link
                  prefetch={true}
                  key={index}
                  href={link.href}
                  className=" flex items-center   hover:text-[var(--secondary)] duration-300 group">
                  <span>{link.title}</span>
                  <ChevronRight
                    size={16}
                    className=" mt-1 group-hover:translate-x-1 duration-300"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-4 sm:col-span-1 space-y-4 ">
            <h4 className="font-medium text-white">Help & Legal</h4>
            <div className=" space-y-2 text-xs font-light">
              {helpLinks.map((link, index) => (
                <Link
                  prefetch={true}
                  key={index}
                  href={link.href}
                  className=" flex items-center   hover:text-[var(--secondary)] duration-300 group">
                  <span>{link.title}</span>
                  <ChevronRight
                    size={16}
                    className=" mt-1 group-hover:translate-x-1 duration-300"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-4 sm:col-span-1 space-y-4  ">
            {socialLinks.some((link) => link.show) && <h4 className="font-medium text-white">Our Socials</h4>}

            <div className=" flex gap-2 text-xs font-light ">
              {socialLinks.map((link, index) => (
                <div key={index}>
                  {link.show && (
                    <Link
                      target="_blank"
                      href={link.href || ""}
                      className=" bg-white/20 h-6 w-6 rounded-full p-1 flex items-center justify-center hover:bg-white/30   hover:-translate-y-1 hover:scale-110 duration-300 ">
                      {link.icon}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <p className="font-light text-xs">
              © {new Date().getFullYear()} {store?.store_name}. All rights reserved.
            </p>
          </div>
        </div>
      </GradientBlurBackground>

      <PowerByFenzora />
    </footer>
  );
}

function IconWhatsApp({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M8.886 7.17c.183.005.386.015.579.443c.128.285.343.81.519 1.238c.137.333.249.607.277.663c.064.128.104.275.02.448l-.028.058a1.4 1.4 0 0 1-.23.37l-.143.17c-.085.104-.17.206-.242.278c-.129.128-.262.266-.114.522s.668 1.098 1.435 1.777a6.6 6.6 0 0 0 1.903 1.2q.105.045.17.076c.257.128.41.108.558-.064c.149-.173.643-.749.817-1.005c.168-.256.34-.216.578-.128c.238.089 1.504.71 1.761.837l.143.07c.179.085.3.144.352.23c.064.109.064.62-.148 1.222c-.218.6-1.267 1.176-1.742 1.22l-.135.016c-.436.052-.988.12-2.956-.655c-2.426-.954-4.027-3.32-4.35-3.799l-.053-.076l-.006-.008c-.147-.197-1.048-1.402-1.048-2.646c0-1.19.587-1.81.854-2.092l.047-.05a.95.95 0 0 1 .687-.32c.173 0 .347 0 .495.005"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2.184 21.331a.4.4 0 0 0 .487.494l4.607-1.204a10 10 0 0 0 4.76 1.207h.004c5.486 0 9.958-4.446 9.958-9.912a9.83 9.83 0 0 0-2.914-7.011A9.92 9.92 0 0 0 12.042 2c-5.486 0-9.958 4.446-9.958 9.911c0 1.739.458 3.447 1.33 4.954zm2.677-4.068a1.5 1.5 0 0 0-.148-1.15a8.4 8.4 0 0 1-1.129-4.202c0-4.63 3.793-8.411 8.458-8.411c2.27 0 4.388.877 5.986 2.468a8.33 8.33 0 0 1 2.472 5.948c0 4.63-3.793 8.412-8.458 8.412h-.005a8.5 8.5 0 0 1-4.044-1.026a1.5 1.5 0 0 0-1.094-.132l-2.762.721z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconTiktok({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      viewBox="0 0 48 48">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="3.833"
        d="M21.358 19.14q-8.833-.426-12.28 6.298c-3.446 6.725-.598 17.729 10.9 17.729c11.5 0 11.832-11.112 11.832-12.276V17.875q3.69 2.336 6.22 2.813q2.533.476 3.22.422v-6.476q-2.342-.282-4.05-1.076c-1.709-.794-5.096-2.997-5.096-6.226q.003.024 0-2.499h-7.118q-.031 23.724 0 26.058c.031 2.334-1.78 5.6-5.45 5.6c-3.672 0-5.483-3.263-5.483-5.367c0-1.288.443-3.155 2.272-4.538c1.085-.82 2.59-1.148 5.033-1.148z"
      />
    </svg>
  );
}
