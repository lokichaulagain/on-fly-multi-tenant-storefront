"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface CustomNotFoundProps {
  className?: string;
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonbg?: string;
}

export function CustomNotFound({ icon, title, description, buttonText, buttonLink, buttonbg = "bg-primary", className = "h-[70vh]" }: CustomNotFoundProps) {
  return (
    <div className={`flex flex-col  items-center justify-center text-center px-4     ${className}`}>
      <div className="rounded-full bg-muted p-4 mb-4">{icon}</div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <Link
        href={buttonLink}
        className=" group">
        <Button className={`flex items-center`}>
          <ArrowLeft
            size={16}
            className=" group-hover:-translate-x-1 transition-all duration-300"
          />
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}
