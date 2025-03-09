"use client";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NoStoreFoundProps {
  store_subdomain?: string;
  custom_domain?: string;
  className?: string;
}

export function NoStoreFound({ store_subdomain, custom_domain, className }: NoStoreFoundProps) {
  const router = useRouter();

  return (
    <div className={cn("flex flex-col h-screen items-center justify-center text-center p-4", className)}>
      <div className="rounded-full bg-muted p-4 mb-4">
        <Store className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium  mb-1 ">No store found</h3>
      <p className="text-sm text-muted-foreground mb-1">
        We couldn&apos;t find any store that matches the br provided <br className="hidden sm:block" /> subdomain or custom domain.
      </p>
      <Link href={`https://app.fenzora.com`}>
        <Button className="bg-primary text-white hover:bg-primary/90">Create New Store</Button>
      </Link>
    </div>
  );
}
