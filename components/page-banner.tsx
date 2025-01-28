import Image from "next/image";
import React from "react";
type Props = {
  image: React.ComponentProps<typeof Image>["src"];
  title?: string;
  description?: string;
};

export default function PageBanner({ image, title, description }: Props) {
  return (
    <div className=" relative flex items-center justify-center mb-20 ">
      <div className="w-full h-full absolute top-0 left-0 bg-black opacity-[0.5] z-10"></div>
      <div className="space-y-3 text-center absolute px-4  z-10">
        <h1 className="text-3xl md:text-6xl text-white font-semibold">{title}</h1>
        <p className="text-white/90 max-w-xl mx-auto ">{description}</p>
      </div>

      <Image
        src={image}
        alt="banner"
        height={500}
        width={1500}
        className=" w-full h-[50vh] object-cover "
      />
    </div>
  );
}