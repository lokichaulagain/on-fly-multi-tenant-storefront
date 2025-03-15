"use client";
import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useCurrentStore } from "@/contexts/current-store-provider";
import Image from "next/image";

export default function CarouselWithPagination() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const store = useCurrentStore();
  const desktop_banners = store?.store_appearance?.desktop_banners;
  const mobile_banners = store?.store_appearance?.mobile_banners;

  const [isMobile, setIsMobile] = React.useState(false);
  // Memoized function to check if the device is mobile
  const checkIfMobile = React.useCallback(() => {
    const isMobileDevice = window.innerWidth <= 768;
    setIsMobile(isMobileDevice);
  }, []);

  // Memoized banners based on device type
  const banners = React.useMemo(() => {
    return isMobile ? mobile_banners : desktop_banners;
  }, [isMobile, mobile_banners, desktop_banners]);

  // Only show navigation buttons if there are multiple banners
  const showNavigation = banners && banners.length > 1;

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handlePaginationClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <Carousel
      setApi={setApi}
      className="w-full overflow-hidden">
      <CarouselContent>
        {banners?.map((banner: string, index: number) => (
          <CarouselItem key={index}>
            <Image
              src={banner}
              alt="carousel"
              className="h-52 md:h-[calc(100vh-6rem)] object-cover w-full"
              height={1000}
              width={1000}
              priority={index === 0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex gap-1 items-center justify-center absolute bottom-4 left-1/2 -translate-x-1/2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            type="button"
            key={index}
            className={cn("h-1.5 rounded-full transition-all", current === index ? "w-8 bg-white" : "w-2.5 bg-white/50")}
            onClick={() => handlePaginationClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {showNavigation && (
        <>
          <CarouselPrevious className="absolute z-20 left-0 ml-2 h-4 w-4 p-2" />
          <CarouselNext className="absolute z-20 right-0 mr-2 h-4 w-4 p-2" />
        </>
      )}
    </Carousel>
  );
}
