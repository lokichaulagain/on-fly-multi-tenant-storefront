export interface IShippingAndBillingAddress {
  full_name: string | null;
  email_address: string | null;
  phone_number: number | null;
  province: string | null;
  district: string | null;
  city: string | null;
  landmark: string | null;
  postal_code: number | null;
}


export interface IOrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  product_quantity: number;
}

export interface IOrderCreate {
  shipping_address: IShippingAndBillingAddress;
  billing_address: IShippingAndBillingAddress | null;
  order_items: IOrderItem[];
  shipping_cost: number;
}
