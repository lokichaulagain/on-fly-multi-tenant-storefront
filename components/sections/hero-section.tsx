import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
type Props = {};

export default async function HeroSection({}: Props) {
  const carousels = [
    {
      thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg",
      link: "/",
    },
    {
      thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_02.jpg",
      link: "/",
    },
    {
      thumbnail: "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_01.jpg",
      link: "/",
    },
    
  ];

  return (
    <section className="">
      <Carousel className=" rounded-sm overflow-hidden">
        <CarouselContent>
          {carousels &&
            carousels.map((carousel, index) => (
              <CarouselItem key={index}>
                <Link href={carousel.link}>
                  <Image
                    src={carousel.thumbnail}
                    alt="carousel"
                    className=" lg:h-[70vh] object-cover rounded-sm"
                    height={500}
                    width={1500}
                  />
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className=" absolute z-20 left-0 ml-2" />
        <CarouselNext className=" absolute z-20 right-0 mr-2" />
      </Carousel>
    </section>
  );
}
