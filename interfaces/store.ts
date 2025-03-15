export interface IStoreAppearance {
  primary_color: string;
  secondary_color: string;
  font_family: string;
  border_radius: number;
  product_aspect_ratio: string;
  favicon: string;
  desktop_banners: string[];
  mobile_banners: string[];
  banner_content: string;
}

export interface IStoreSocialLinks {
  facebook_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
  primary_whatsapp_number: string | null;
  google_map_url: string | null;
}
