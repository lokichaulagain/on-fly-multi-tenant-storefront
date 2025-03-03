export interface IProductPreview {
  id: string;
  name: string;
  slug: string;
  selling_price: number | null;
  crossed_price: number | null;
  image_url: string;
  store_id: string;
  status: string;
  created_at: Date;
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;

  user_id: string;
  store_id: string;

  description: string | null;
  cost_price: number | null;
  selling_price: number | null;
  crossed_price: number | null;
  stock: number | null;
  sku: string | null;
  barcode: string | null;
  category_id: string | null;
  continue_selling_even_out_of_stock: boolean;
  has_variants: boolean;
  image_urls: string[];
  status: "active" | "inactive";

  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
