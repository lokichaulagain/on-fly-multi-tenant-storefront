import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SectionHeader from "@/components/section-header";
import { IProductPreview } from "@/interfaces/product";
import SingleProductCard from "./single-product-card";

interface ProductCarouselSectionProps {
  title: string;
  products: IProductPreview[];
}

export default async function ProductCarouselSection({ title, products }: ProductCarouselSectionProps) {
  if (products?.length === 0) {
    return null;
  }

  return (
    <section>
      <div>
        <SectionHeader title={title || "Featured Products"} />
      </div>
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {products?.map((product: IProductPreview) => (
            <CarouselItem
              key={product.slug}
              className="basis-full sm:basis-1/2 lg:basis-1/4 xl:basis-1/4">
              <SingleProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute flex gap-2 -top-9 right-12">
          <CarouselPrevious className="absolute z-20 -left-8" />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
}
