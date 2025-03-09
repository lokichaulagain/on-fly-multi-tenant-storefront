"use client";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NoOrderFound() {
  return (
    <div className={cn("flex flex-col h-[73vh] items-center justify-center text-center p-4")}>
      <div className="rounded-full bg-muted p-4 mb-4">
        <Package className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium  mb-1 ">No orders found</h3>
      <p className="text-sm text-muted-foreground mb-1">You haven&apos;t placed any orders yet.</p>
      <Link href={`/shop`}>
        <Button className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]">Shop Now</Button>
      </Link>
    </div>
  );
}
