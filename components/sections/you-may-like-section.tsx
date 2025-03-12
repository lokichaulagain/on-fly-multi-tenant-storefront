import { getActiveStoreProductsWithPreviewData } from "@/actions/product";
import ProductCarouselSection from "../product-carousel-section";

export default async function YouMayLikeSection() {
  const response = await getActiveStoreProductsWithPreviewData(); 
  if (response.error || !response.data) {
    return <p>No products found</p>;
  }

  return (
    <ProductCarouselSection
      title="You May Also Like"
      products={response.data}
    />
  );
}
