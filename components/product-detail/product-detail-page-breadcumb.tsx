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
        className="text-muted-foreground hover:text-primary">
        Home
      </Link>
      <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
      <Link
        href="/shop/category/shoes"
        className="text-muted-foreground hover:text-primary">
        Shoes
      </Link>

      <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
      <Link
        href={`/shop/category/$slug}`}
        className="text-foreground font-medium">
        {name}
      </Link>
    </nav>
  );
}
