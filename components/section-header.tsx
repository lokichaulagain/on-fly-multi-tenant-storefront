import React from "react";

type Props = {
  title: string;
};

export default function SectionHeader({ title }: Props) {
  return <h3 className="prose text-xl  sm:text-2xl font-bold mb-6">{title}</h3>;
}
