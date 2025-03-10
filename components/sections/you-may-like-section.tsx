import { getActiveStoreProductsWithPreviewData } from "@/actions/product";
import GridProducts from "@/components/grid-products";
  
export default async function YouMayLikeSection() {
  const response = await getActiveStoreProductsWithPreviewData(); 

  if (response.error || !response.data) {
    return <p>No products found</p>;
  }

  return (
    <GridProducts
      title="You May Also Like"
      products={response.data}
    />
  );
}
