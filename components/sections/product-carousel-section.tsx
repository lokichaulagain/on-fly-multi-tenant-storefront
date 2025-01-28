import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SectionHeader from "../section-header";
import SingleProductCard from "../single-product-card";
// import SectionHeader from "./SectionHeader";
// import SingleProductCard from "./SingleProductCard";
type Props = {
  title:string,
  products:any
};

export default function ProductCarouselSection({title,products}: Props) {
  return (
   <section>
    <SectionHeader title={title}/>
     <Carousel
      opts={{
        align: "start",
      }}
      className="">
      <CarouselContent>
        {products && products.map((product:any) => (
          <CarouselItem
            key={product.id}
            className="md:basis-1/2 lg:basis-1/4">
             <SingleProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" absolute z-20 left-0 ml-2" />
      <CarouselNext className=" absolute z-20 right-0 mr-2" />
    </Carousel>
   </section>
  );
}

