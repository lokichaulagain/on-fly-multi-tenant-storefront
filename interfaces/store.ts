export interface ActiveDomainInfo {
  id: string;
  store_name: string;
  store_subdomain: string;
  custom_domain: string | null;
}

export interface IStoreMetadata {
  id: string;
  store_name: string;
  store_subdomain: string;
  custom_domain: string | null;
  store_logo: string;
  store_meta_title: string | null;
  store_meta_description: string | null;
  store_meta_image: string | null;
  store_description: string | null;
}

// export interface StoreAppearance {
//   primary_color: string | null;
//   secondary_color: string | null;
//   font_family: string | null;
//   button_style: string | null;
//   footer_layout: string | null;
//   border_radius: string | null;
//   navbar_layout: string | null;
//   product_card_style: string | null;
//   product_aspect_ratio: string | null;
// }

export interface IStoreAppearance {
  primary_color: string;
  secondary_color: string;
  font_family: string;
  button_style: string;
  border_radius: number;
  product_aspect_ratio: string;
  favicon: string;
  desktop_banners: string[];
  mobile_banners: string[];
}

export interface IStoreSocialLinks {
  facebook_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
  primary_whatsapp_number: string | null;
  google_map_url: string | null;
}
