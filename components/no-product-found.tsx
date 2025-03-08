"use client";

import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface NoProductsFoundProps {
  title?: string;
  message?: string;
  className?: string;
}

export function NoProductsFound({ title = "No products found", message = "We couldn't find any products matching your criteria.", className }: NoProductsFoundProps) {
  const router = useRouter();

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <div className="rounded-full bg-muted p-4 mb-4">
        <PackageSearch className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium  mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-1">{message}</p>
      <Button
        className=" bg-[var(--secondary)] hover:bg-[var(--secondary)]"
        onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  );
}
