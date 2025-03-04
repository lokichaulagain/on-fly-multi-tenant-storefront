import { getActiveDomainInfo } from "@/actions/store";
import CheckoutPageSection from "@/components/checkout-page-section";

export default async function Page() {
  const response = await getActiveDomainInfo();
  const store_id = response.data?.id;
  

  if (response.error || !store_id) {
    return <div>No store found</div>;
  }
 

  return (
    <div>
      <CheckoutPageSection store_id={store_id } />
    </div>
  );
}
