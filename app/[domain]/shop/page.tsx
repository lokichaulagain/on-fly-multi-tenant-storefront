import PageBanner from "@/components/page-banner";
import ShopFilterSheet from "@/components/shop-filter-sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getActiveStoreProductsWithPreviewData } from "@/actions/product";
import { IProductPreview } from "@/interfaces/product";
import SingleProductCard from "@/components/single-product-card";
import { getActiveStoreCategoriesWithPreviewData } from "@/actions/category";
import { ICategoryPreview } from "@/interfaces/category";

const banner1 = "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg";

export default async function Page() {
  const categoriesResponse = await getActiveStoreCategoriesWithPreviewData();
  const categories = categoriesResponse?.data;

  const response = await getActiveStoreProductsWithPreviewData();

  if (categoriesResponse.error || !categories) {
    return <div>No categories found</div>;
  }

  if (response.error || !response.data) {
    return <div>No products found</div>;
  }

  return (
    <div className=" ">
      <PageBanner
        image={banner1}
        title="SHOPS"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
      />
      <div className=" block lg:hidden">
        <div className="mx-auto flex justify-end mb-4 px-4 -mt-10 lg:-mt-0">
          <ShopFilterSheet />
        </div>
      </div>

      <div className="flex gap-4  container px-4 md:px-24 mx-auto ">
        <ScrollArea className=" w-3/12 hidden lg:block">
          <>
            <div className=" flex flex-col gap-2">
              {categories.map((category: ICategoryPreview) => (
                <p key={category.slug}>{category.name}</p>
              ))}
            </div>
          </>
        </ScrollArea>

        <div className="w-9/12 grid grid-cols-2  md:grid-cols-3 lg:grid-cols-2  2xl:grid-cols-3 gap-4">
          {response.data.map((product: IProductPreview) => (
            <SingleProductCard
              key={product.slug}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
