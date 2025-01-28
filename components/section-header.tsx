import React from "react";

type Props = {
  title: string;
};

export default function SectionHeader({ title }: Props) {
  return (
    <div className=" flex justify-center text-3xl font-medium mt-20 mb-8">
      <p>{title}</p>
    </div>
  );
}