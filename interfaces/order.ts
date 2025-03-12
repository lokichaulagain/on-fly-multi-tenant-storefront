export interface IShippingAndBillingAddress {
  full_name: string;
  email_address: string;
  phone_number: number | null;
  province: string;
  district: string;
  city: string;
  landmark: string;
  postal_code: string;
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


export interface IOrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  product_quantity: number;
  user_id: string;
  store_id: string;
}

