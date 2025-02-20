import PageBanner from "@/components/page-banner";
import ShopRightProductSection from "@/components/sections/shop-right-product-section";
import ShopFilterSheet from "@/components/shop-filter-sheet";
import ShopLeftSideBar from "@/components/shop-left-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const banner1 = "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg";

export default async function Page({ searchParams }: any) {
  const selectedCollection = searchParams;
  const selectedCollectionId = selectedCollection?.collection;

  console.log(selectedCollectionId, "selectedCollectionId");

  return (
    <div className=" ">
      <PageBanner
        image={banner1}
        title="SHOPS"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
      />
      <div className=" block lg:hidden">
        <div className="w-full lg:w-9/12 mx-auto flex justify-end mb-4 px-4 -mt-10 lg:-mt-0">
          <ShopFilterSheet />
        </div>
      </div>

      <div className="flex  w-full lg:w-9/12 mx-auto gap-4 px-4 ">
        <ScrollArea className=" w-3/12 h-screen hidden lg:block">
          <ShopLeftSideBar />
        </ScrollArea>
        <div className="w-full lg:w-9/12 grid grid-cols-2  md:grid-cols-3 lg:grid-cols-2  2xl:grid-cols-3 gap-4">
          {/* <ShopRightProductSection selectedCollectionId={selectedCollectionId} /> */}
          <ShopRightProductSection  />
        </div>
      </div>
    </div>
  );
}
