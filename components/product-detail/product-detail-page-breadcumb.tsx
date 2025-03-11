import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ProductDetailPageBreadcumbProps {
  slug: string;
  name: string;
}

export default function ProductDetailPageBreadcumb({ slug, name }: ProductDetailPageBreadcumbProps) {
  return (
    <nav className="flex items-center text-sm mb-4">
      <Link
        href="/"
        className="text-muted-foreground hover:text-[var(--primary)] transition-colors duration-300">
        Home
      </Link>
      <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
      <Link
        href="/shop"
        className="text-muted-foreground hover:text-[var(--primary)] transition-colors duration-300">
        Shop
      </Link>

      <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground " /> 
      <Link
        href={`/shop/${slug}`}
        className="font-medium hover:text-[var(--primary)] transition-colors duration-300">
        {name}
      </Link>
    </nav>
  );
}
