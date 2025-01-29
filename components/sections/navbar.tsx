"use client";
import Link from "next/link";
import React from "react";
type Props = {};
import { useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Package } from "lucide-react";
import MobileSheet from "../mobile-sheet";

export default function Navbar({}: Props) {
  const [state, setState] = useState(false);
  const pathname=usePathname()
  console.log(pathname)

  // Replace / paths with your paths
  const navigation = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/shop" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white border-b shadow-sm w-full md:static md:text-sm md:border-none h-16 flex items-center justify-center   ">
      <div className="items-center w-full container    mx-auto md:flex">
        <div className="flex items-center justify-between    md:block">
          <Link href="/" className=" flex items-center gap-1 text-primary">
          <Package />
            <p className=" text-2xl tracking-wide font-serif ">Miniture</p>
          </Link>
          <div className="md:hidden">
           
             <MobileSheet navigation={navigation}/>
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
                    className= {`${pathname === item.path ? " text-primary" : ""}`}>
                    {item.title}
                  </Link>
                </div>
              );
            })}
            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              <div>
                <Link
                  href="/login"
                  className="block py-3 text-center  hover:text-primary border rounded-lg md:border-none">
                  Log In
                </Link>
              </div>
              <div>
                <Link href={"/register"}>
                <Button>Register</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}