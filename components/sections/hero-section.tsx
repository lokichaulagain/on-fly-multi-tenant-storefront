"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { useCurrentStore } from "@/contexts/current-store-provider";

export default function HeroSection() {
  const store = useCurrentStore();
  const desktop_banners = store?.store_appearance?.desktop_banners;
  const mobile_banners = store?.store_appearance?.mobile_banners;

  const [isMobile, setIsMobile] = React.useState(false);

  // Memoized function to check if the device is mobile
  const checkIfMobile = React.useCallback(() => {
    const isMobileDevice = window.innerWidth <= 768;
    setIsMobile(isMobileDevice);
  }, []);

  React.useEffect(() => {
    // Initial check
    checkIfMobile();

    // Debounced resize handler
    const handleResize = () => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(checkIfMobile, 100);
      };
    };

    const debouncedResize = handleResize();
    window.addEventListener("resize", debouncedResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", debouncedResize);
  }, [checkIfMobile]);

  // Memoized banners based on device type
  const banners = React.useMemo(() => {
    return isMobile ? mobile_banners : desktop_banners;
  }, [isMobile, mobile_banners, desktop_banners]);

  // Only show navigation buttons if there are multiple banners
  const showNavigation = banners && banners.length > 1;

  return (
    <Carousel className="rounded-sm overflow-hidden">
      <CarouselContent>
        {banners?.map((banner: string, index: number) => (
          <CarouselItem key={index}>
            <Image
              src={banner}
              alt="carousel"
              className=" h-52  lg:h-[70vh] object-cover rounded-sm"
              height={500}
              width={1500}
              priority
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {showNavigation && (
        <>
          <CarouselPrevious className="absolute z-20 left-0 ml-2" />
          <CarouselNext className="absolute z-20 right-0 mr-2" />
        </>
      )}
    </Carousel>
  );
}
