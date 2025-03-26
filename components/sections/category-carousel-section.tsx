import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SectionHeader from "@/components/section-header";
import { ICategoryPreview } from "@/interfaces/category";
import { getActiveStoreCategoriesWithPreviewData } from "@/actions/category";
import SingleCategoryCard from "@/components/single-category-card";

export default async function CategoryCarouselSection() {
  const response = await getActiveStoreCategoriesWithPreviewData();
  const categories = response?.data || []

  if (response.error || categories?.length === 0) {
    console.log("Something went wrong", response.error);
    return null;
  }

  return (
    <section>
      <div>
        <SectionHeader title="Explore Categories" />
      </div>
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {categories?.map((category: ICategoryPreview) => (
            <CarouselItem
              key={category.slug}
              className="basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5 group ">
              <SingleCategoryCard category={category} />
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
