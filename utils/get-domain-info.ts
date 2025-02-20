import { headers } from 'next/headers';
import { getStoreBySubdomain } from '@/actions/store';

export async function getDomainInfo() {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  // const subdomain = host.split('.')[0];
  const subdomain = "loki";
  
  const response = await getStoreBySubdomain(subdomain);
  
  if (!response || response.error) {
    return {
      domain: host,
      subdomain: subdomain,
      storeName: null,
      storeData: null
    };
  }

  return {
    domain: host,
    subdomain: subdomain,
    storeName: response.data?.store_name || null,
    storeData: response.data
  };
} 