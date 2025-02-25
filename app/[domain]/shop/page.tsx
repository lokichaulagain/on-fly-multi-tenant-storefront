import PageBanner from "@/components/page-banner";
import ShopFilterSheet from "@/components/shop-filter-sheet";
import ShopLeftSideBar from "@/components/shop-left-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getDomainInfo } from "@/utils/get-domain-info";
import { getProductsByStoreId } from "@/actions/product";
import { IProductPreview } from "@/interfaces/product";
import SingleProductCard from "@/components/single-product-card";

const banner1 = "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg";

export default async function Page() {
  const { subdomain, storeData } = await getDomainInfo();

  const response = await getProductsByStoreId(storeData?.id || "");

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
          <ShopLeftSideBar />
        </ScrollArea>

        <div className="w-9/12 grid grid-cols-2  md:grid-cols-3 lg:grid-cols-2  2xl:grid-cols-3 gap-4">
          {response.data.map((product: IProductPreview) => (
            <SingleProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
