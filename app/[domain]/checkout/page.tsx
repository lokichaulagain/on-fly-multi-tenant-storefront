import { getActiveStore } from "@/actions/store";
import CheckoutPageSection from "@/components/checkout-page-section";

export default async function Page() {
  const response = await getActiveStore();
  const store_id = response.data?.id;

  return (
    <div className="min-h-screen container mx-auto px-4 md:px-24 ">
      <CheckoutPageSection store_id={store_id ?? ""} />
    </div>
  );
}
