import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SectionHeader from "../section-header";
import SingleProductCard from "../single-product-card";
import { getActiveStoreProductsWithPreviewData } from "@/actions/product";
import { IProductPreview } from "@/interfaces/product";

export default async function SimilarProductSection() {
  const response = await getActiveStoreProductsWithPreviewData();

  if (response.error || !response.data) {
    return <div>No products found</div>;
  }

  return (
    <section>
      <SectionHeader title={"hahahah"} />
      <Carousel
        opts={{
          align: "start",
        }}
        className="">
        <CarouselContent>
          {response.data &&
            response.data.map((product: IProductPreview) => (
              <CarouselItem
                key={product.slug}
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
