import { Products } from "@/lib/db/schema";
import ProductDetailPageBreadcumb from "./product-detail-page-breadcumb";
import ProductInfo from "./product-info";
import ProductImageGallery from "./product-image-gallery";
import ProductDetailTab from "./product-detail-tab";

interface ProductDisplayProps {
  product: Products;
}

export default function ProductDisplay({ product }: ProductDisplayProps) {
  return (
    <div>
      <ProductDetailPageBreadcumb
        slug={product.slug}
        name={product.name}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductImageGallery product={product} />
        <ProductInfo product={product} />
      </div>

      <ProductDetailTab
        product_id={product.id}
        description={product.description}
      />
    </div>
  );
}
