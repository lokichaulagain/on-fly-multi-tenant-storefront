export const calculateOrderTotal = (order: any) => {
  const itemsTotal = order.order_items.reduce((sum: number, item: any) => sum + item.product_price * item.product_quantity, 0);
  return itemsTotal + order.shipping_cost;
};
