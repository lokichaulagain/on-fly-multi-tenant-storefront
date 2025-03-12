"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface CustomNotFoundProps { 
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function CustomNotFound({ icon, title, description, buttonText, buttonLink }: CustomNotFoundProps) {     
  return (
    <div className={"flex flex-col h-screen items-center justify-center text-center p-4"}>
      <div className="rounded-full bg-muted p-4 mb-4">{icon}</div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-1">{description}</p>
      <Link href={buttonLink}>
        <Button className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]">{buttonText}</Button>
      </Link>
    </div>
  );
}
