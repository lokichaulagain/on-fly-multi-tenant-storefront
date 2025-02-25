import CheckoutPageSection from "@/components/checkout-page-section";
import { getDomainInfo } from "@/utils/get-domain-info";

export default async function Page() {
  const { subdomain, storeData } = await getDomainInfo();
  const store_id = storeData?.id ;

  return (
    <div>
      <CheckoutPageSection store_id={store_id as string} />
    </div>
  );
}
