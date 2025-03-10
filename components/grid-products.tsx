import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SectionHeader from "@/components/section-header";
import { IProductPreview } from "@/interfaces/product";
import SingleProductCard from "./single-product-card";

interface ProductCarouselSectionProps {
  title: string;
  products: IProductPreview[];
}

export default async function GridProducts({ title, products }: ProductCarouselSectionProps) {
  if (products?.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeader title={title || "Explore More"} />
      <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {products?.map((product: IProductPreview) => (
          <SingleProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
