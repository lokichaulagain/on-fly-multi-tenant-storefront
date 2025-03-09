import Link from "next/link";
import { ChevronRight, Facebook, Instagram, MapPin, Youtube, Zap } from "lucide-react";
import Image from "next/image";
import { Stores } from "@/lib/db/schema";


export default function Footer({ store, pages }: { store: Stores; pages: IActiveStorePagesWithPreviewData[] }) {
  const quickLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Cart",
      href: "/checkout",
    },
    {
      title: "Shop",
      href: "/shop",
    },
    ...pages
      .filter((page) => !["help", "privacy-policy", "terms-of-service"].includes(page.slug)) 
      .map((page) => ({
        title: page.title,
        href: `/p/${page.slug}`,
      })),
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
  ];
  return (
    <footer className="footerbg pt-12 pb-4 bg-[var(--primary)]  text-white mt-16 ">
      <div className=" container mx-auto px-4 md:px-24 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className=" col-span-4 sm:col-span-4 lg:col-span-1">
          <Image
            src={store?.store_logo}
            alt="logo"
            width={32}
            height={32}
          />
          <p className=" text-2xl md:text-3xl">{store?.store_name}</p>
          <p className=" text-sm">{store?.store_meta_description}</p>
        </div>

        <div className="col-span-4 sm:col-span-1 space-y-4 ">
          <h4 className="font-medium">Quick Links</h4>
          <div className=" space-y-2 text-sm">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className=" flex items-center  hover:text-[var(--secondary)] duration-300">
                {link.title}
                <ChevronRight size={16} />
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-4 sm:col-span-1 space-y-4 ">
          <h4 className="font-medium">Help & Legal</h4>
          <div className=" space-y-2 text-sm">
            {helpLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className=" flex items-center hover:text-[var(--secondary)] duration-300 ">
                {link.title}
                <ChevronRight size={16} />
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-4 sm:col-span-1 space-y-4 ">
          <h4 className="font-medium">Our Socials</h4>

          <div className="space-y-2 text-sm">
            {store.social_links?.facebook_url && (
              <Link
                target="_blank"
                href="https://www.facebook.com/stocknp"
                className="flex items-center text-white hover:text-[var(--secondary)] duration-300">
                <Facebook className="mr-2 h-4 w-4 text-blue-700" />
                Follow us on Facebook
              </Link>
            )}

            {store.social_links?.instagram_url && (
              <Link
                target="_blank"
                href="https://www.instagram.com/stocknp"
                className="flex items-center text-white hover:text-[var(--secondary)] duration-300">
                <Instagram className="mr-2 h-4 w-4 text-pink-500" />
                Follow us on Instagram
              </Link>
            )}

            {store.social_links?.primary_whatsapp_number && (
              <Link
                target="_blank"
                href="https://wa.me/9779864755749"
                className="flex items-center text-white hover:text-[var(--secondary)] duration-300">
                <IconWhatsApp />
                Message us on Whatsapp
              </Link>
            )}

            {store.social_links?.google_map_url && (
              <Link
                target="_blank"
                href="https://wa.me/9779864755749"
                className="flex items-center text-white hover:text-[var(--secondary)] duration-300">
                <MapPin className="mr-2 h-4 w-4 text-white" />
                Visit Our Location
              </Link>
            )}

            {store.social_links?.youtube_url && (
              <Link
                target="_blank"
                href="https://wa.me/9779864755749"
                className="flex items-center text-white hover:text-[var(--secondary)] duration-300">
                <Youtube className="mr-2 h-4 w-4 text-red-500" />
                Subscribe to our Youtube
              </Link>
            )}

            {store.social_links?.tiktok_url && (
              <Link
                target="_blank"
                href="https://wa.me/9779864755749"
                className="flex items-center text-white hover:text-[var(--secondary)] duration-300">
                <IconTiktok />
                Follow us on Tiktok
              </Link>
            )}
          </div>
        </div>
      </div>

      <p className=" flex items-center justify-center gap-1 text-xs">
        <Zap
          size={14}
          className=" text-white"
        />
        Powered by
        <Link
          target="_blank"
          href="https://fenzora.com"
          className=" font-medium underline ">
          Fenzora
        </Link>
      </p>
    </footer>
  );
}

import React from "react";
import { IActiveStorePagesWithPreviewData } from "@/interfaces/page";

function IconWhatsApp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      className="mr-2  text-green-500"
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

function IconTiktok() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      className=" mr-2 text-purple-500"
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
