"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function GridProductsSkeleton() {
  const skeletonItems = Array.from({ length: 8 }, (_, i) => i);

  return (
    <section>
      <div className="mb-4">
        {/* Section header skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48 bg-accent" />
        </div>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {skeletonItems.map((item) => (
            <div  key={item} className="space-y-1 group">
              <div className="group overflow-hidden border border-border transition-all duration-300 rounded-[var(--radius)]">
                <div className="relative aspect-square overflow-hidden rounded-t-[var(--radius)]">
                  {/* Image skeleton */}
                  <Skeleton className="h-full w-full bg-accent" />
                  {/* Discount badge skeleton */}
                  <Skeleton className="absolute right-2 top-2 h-4 w-16 bg-accent" />
                </div>

                <div className="p-4">
                  {/* Product name skeleton */}
                  <Skeleton className="h-4 w-full mb-2 bg-accent" />
                  <Skeleton className="h-4 w-3/4 mb-4 bg-accent   " />

                  {/* Price skeleton */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20 bg-accent" /> {/* Main price */}
                    <Skeleton className="h-4 w-16 bg-accent" /> {/* Crossed price */}
                  </div>
                </div>

                <div className="px-4 pb-4">
                  {/* Add to cart button skeleton */}
                  <Skeleton className="h-10 w-full rounded-md bg-accent"></Skeleton>
                </div>
              </div>
            </div>
        ))}
      </div>
    </section>
  );
}
