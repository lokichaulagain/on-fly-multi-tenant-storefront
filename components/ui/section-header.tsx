import React from "react";

interface ISectionHeader {
  title: string;
}

export default function SectionHeader({ title }: ISectionHeader) {
  return <p className=" text-xl  md:text-2xl font-medium mb-6  opacity-90">{title}</p>;
}
