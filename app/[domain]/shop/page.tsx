import PageBanner from "@/components/page-banner";
import { getActiveStoreProductsWithPreviewData } from "@/actions/product";
import { IProductPreview } from "@/interfaces/product";
import SingleProductCard from "@/components/single-product-card";
import { ErrorAlert } from "@/components/error-altert";
import { CustomNotFound } from "@/components/not-found/custom-not-found";
import { PackageSearch } from "lucide-react";
const banner1 = "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg";

export default async function Page() {
  const response = await getActiveStoreProductsWithPreviewData();

  return (
    <div>
      <PageBanner
        image={banner1}
        title="SHOP"
        description="Lets find your favorite products here and more"
      />
      <div className="container mx-auto px-4 md:px-24">
        {response.error ? (
          <ErrorAlert />
        ) : response.data?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {response.data.map((product: IProductPreview) => (
              <SingleProductCard
                key={product.slug}
                product={product}
              />
            ))}
          </div>
        ) : (
          <CustomNotFound
            icon={<PackageSearch className="h-6 w-6 text-muted-foreground" />}
            title="No products found"
            description="We couldn't find any products that matches the br provided slug."
            buttonText="Go Home"
            buttonLink="/"
          />
        )}
      </div>
    </div>
  );
}
