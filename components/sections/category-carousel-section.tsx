import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SectionHeader from "@/components/section-header";
import { ICategoryPreview } from "@/interfaces/category";
import { getActiveStoreCategoriesWithPreviewData } from "@/actions/category";
import SingleCategoryCard from "@/components/single-category-card";

export default async function CategoryCarouselSection() {
  const response = await getActiveStoreCategoriesWithPreviewData();
  const categories = response?.data;

  if (response.error || !categories) {
    return <p>No categories found</p>;
  }

  return (
    <section>
      <SectionHeader title="Explore Categories" />
      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {categories?.map((category: ICategoryPreview) => (
            <CarouselItem
              key={category.slug}
              className="md:basis-1/2 lg:basis-1/4 group shadow-sm">
              <SingleCategoryCard category={category} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute z-20 left-0 ml-2" />
        <CarouselNext className="absolute z-20 right-0 mr-2" />
      </Carousel>
    </section>
  );
}
