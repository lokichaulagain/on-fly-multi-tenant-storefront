export interface ActiveDomainInfo {
  id: string;
  store_name: string;
  store_subdomain: string;
  custom_domain: string | null;
}



export interface StoreMetadata {
  id: string;
  store_name: string;
  store_subdomain: string;
  custom_domain: string | null;
  store_logo: string | null;
  store_meta_title: string | null;
  store_meta_description: string | null;
  store_meta_image: string | null;
}