"use client";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NoPageFound() {
  return (
    <div className={"flex flex-col h-screen items-center justify-center text-center p-4"}>
      <div className="rounded-full bg-muted p-4 mb-4">
        <Store className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium  mb-1 ">Page Not Found - 404</h3>
      <p className="text-sm text-muted-foreground mb-1">We couldn&apos;t find any page that you are looking for.</p>
      <Link href={`/`}>
        <Button className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]">Go Home</Button>
      </Link>
    </div>
  );
}
