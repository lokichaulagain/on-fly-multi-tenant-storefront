import parse from "html-react-parser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getActiveProductReviews } from "@/actions/review";
import { ProductDetailReviewSection } from "./product-detail-review-section";

interface ProductDetailTabProps {
  description?: string | null;
  product_id: string;
}

export default async function ProductDetailTab({ description, product_id }: ProductDetailTabProps) {
  const response = await getActiveProductReviews(product_id);
  console.log(response,"hahhaha")
  if (response.error || !response.data) {
    return null;
  }

  return (
    <div className="mt-12">
      <Tabs defaultValue="description">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="description"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--secondary)] px-4 py-2">
            Description
          </TabsTrigger>

          <TabsTrigger
            value="reviews"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--secondary)] px-4 py-2">
            Reviews (128)
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="description"
          className="pt-6">
          <h3 className="text-lg font-medium mb-4">Product Description</h3>

          <div className="prose prose-lg prose-p:text-lg prose-p:text-muted-foreground max-w-none">{parse(description || "")}</div>
        </TabsContent>

        <TabsContent
          value="reviews"
          className="pt-6">
            
          <ProductDetailReviewSection
            product_id={product_id}
            reviews={response.data}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
