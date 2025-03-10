import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryCarouselSkeleton() {
  const skeletonItems = Array.from({ length: 10 }, (_, i) => i)

  return (
    <section>
      <div className="mb-4">
        {/* Section header skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48 bg-muted" />
        </div>
      </div>
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent >
          {skeletonItems.map((item) => (
            <CarouselItem key={item} className="basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5 group shadow-sm">
              <div className="relative md:h-92 overflow-hidden rounded-2xl">
                {/* Image skeleton */}
                <Skeleton className="h-[200px] w-full rounded-2xl bg-muted" />
                {/* Title skeleton */}
                <Skeleton className="h-4 w-24 absolute top-2 md:top-4 left-2 md:left-4 bg-muted" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute flex gap-2 -top-9 right-12 ">
          <CarouselPrevious className="absolute z-20 -left-8 bg-muted" />
          <CarouselNext className="bg-muted" />
        </div>
      </Carousel>
    </section>
  )
}

