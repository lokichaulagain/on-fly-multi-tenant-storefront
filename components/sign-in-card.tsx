"use client";
import { SignIn } from "@clerk/nextjs";

import Image from "next/image";
import bg from "@/public/sign-up-bg.webp";

export default function SignInCard() {

  return (
    <div className="relative h-screen w-full">
      <Image
        className="absolute inset-0 h-full w-full object-cover"
        src={bg || "/placeholder.svg"}
        alt="Background image"
        priority
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <SignIn routing="hash" />
      </div>
    </div>
  );
}
