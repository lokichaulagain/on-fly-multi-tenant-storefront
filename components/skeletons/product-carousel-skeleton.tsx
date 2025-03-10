"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCarouselSkeleton() {
  const skeletonItems = Array.from({ length: 10 }, (_, i) => i);

  return (
    <section>
      <div className="mb-4">
        {/* Section header skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48 bg-accent" />
        </div>
      </div>
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {skeletonItems.map((item) => (
            <CarouselItem
              key={item}
              className="basis-full sm:basis-1/2 lg:basis-1/4 xl:basis-1/4">
              <div className="space-y-1 group">
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
                    <Skeleton className="h-10 w-full rounded-md bg-accent">
                      
                    </Skeleton>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute flex gap-2 -top-9 right-12 ">
          <CarouselPrevious className="absolute z-20 -left-8 bg-accent" />
          <CarouselNext className="bg-accent" />
        </div>
      </Carousel>
    </section>
  );
}
