import React from "react";

type Props = {
  title?: string;
  description?: string;
};

export default function PageBanner({ title, description }: Props) {
  return (
    <div className="  flex items-center justify-center mb-16 pt-12 px-4 ">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold">{title}</h1>
        <p className=" max-w-xl mx-auto ">{description}</p>
      </div>
    </div>
  );
}
