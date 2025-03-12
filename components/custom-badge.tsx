import { ENUM_PAYMENT_STATUS, ENUM_PRODUCT_STATUS, ENUM_SHIPPING_STATUS, ENUM_CATEGORY_STATUS } from "@/enums";

export const getPaymentStatusColor = (status: ENUM_PAYMENT_STATUS) => {
  switch (status) {
    case ENUM_PAYMENT_STATUS.PAID:
      return "bg-green-100 text-green-800 hover:bg-green-100 hover:bg-green-200 border border-green-200";
    case ENUM_PAYMENT_STATUS.PENDING:
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:bg-yellow-200 border border-yellow-200";
    case ENUM_PAYMENT_STATUS.PARTIALLY_PAID:
      return "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:bg-blue-200 border border-blue-200";
    case ENUM_PAYMENT_STATUS.FAILED:
      return "bg-red-100 text-red-800 hover:bg-red-100 hover:bg-red-200 border border-red-200";
    case ENUM_PAYMENT_STATUS.REFUNDED:
      return "bg-purple-100 text-purple-800 hover:bg-purple-100 hover:bg-purple-200 border border-purple-200";
    case ENUM_PAYMENT_STATUS.CANCELLED:
      return "bg-red-100 text-red-800 hover:bg-red-100 hover:bg-red-200 border border-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100 hover:bg-gray-200 border border-accent";
  }
};

export const getShippingStatusColor = (status: ENUM_SHIPPING_STATUS) => {
  switch (status) {
    case ENUM_SHIPPING_STATUS.DELIVERED:
      return "bg-green-100 text-green-800 hover:bg-green-100 hover:bg-green-200  border border-green-200";
    case ENUM_SHIPPING_STATUS.SHIPPED:
      return "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:bg-blue-200 border border-blue-200";
    case ENUM_SHIPPING_STATUS.PROCESSING:
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:bg-yellow-200 border border-yellow-200";
    case ENUM_SHIPPING_STATUS.PENDING:
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:bg-yellow-200 border border-yellow-200";
    case ENUM_SHIPPING_STATUS.RETURNED:
      return "bg-red-100 text-red-800 hover:bg-red-100 hover:bg-red-200 border border-red-200";
    case ENUM_SHIPPING_STATUS.CANCELLED:
      return "bg-red-100 text-red-800 hover:bg-red-100 hover:bg-red-200 border border-red-200";
    case ENUM_SHIPPING_STATUS.ON_HOLD:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100 hover:bg-gray-200 border border-accent";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100 hover:bg-gray-200 border border-accent";
  }
};

export const getProductStatusColor = (status: ENUM_PRODUCT_STATUS) => {
  switch (status) {
    case ENUM_PRODUCT_STATUS.ACTIVE:
      return "bg-green-100 text-green-800 hover:bg-green-100 hover:bg-green-200 border border-green-200";
    case ENUM_PRODUCT_STATUS.INACTIVE:
      return "bg-red-100 text-red-800 hover:bg-red-100 hover:bg-red-200 border border-red-200";
    case ENUM_PRODUCT_STATUS.OUT_OF_STOCK:
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:bg-yellow-200 border border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100 hover:bg-gray-200 border border-accent";
    case ENUM_PRODUCT_STATUS.DRAFT:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100 hover:bg-gray-200 border border-accent";
  }
};

export const getCategoryStatusColor = (status: ENUM_CATEGORY_STATUS) => {
  switch (status) {
    case ENUM_CATEGORY_STATUS.ACTIVE:
      return "bg-green-100 text-green-800 hover:bg-green-100 hover:bg-green-200 border border-green-200";
    case ENUM_CATEGORY_STATUS.INACTIVE:
      return "bg-red-100 text-red-800 hover:bg-red-100 hover:bg-red-200 border border-red-200";
  }
};

export const StatusBadge = ({ status, type }: { status: ENUM_PAYMENT_STATUS | ENUM_SHIPPING_STATUS; type: "payment" | "shipping" }) => {
  const colorClass = type === "payment" ? getPaymentStatusColor(status as ENUM_PAYMENT_STATUS) : getShippingStatusColor(status as ENUM_SHIPPING_STATUS);
  const formattedStatus = status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap  ${colorClass}`}>{formattedStatus}</span>;
};

export const ProductStatusBadge = ({ status }: { status: ENUM_PRODUCT_STATUS }) => {
  const colorClass = getProductStatusColor(status);
  const formattedStatus = status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap  ${colorClass}`}>{formattedStatus}</span>;
}; 

export const CategoryStatusBadge = ({ status }: { status: ENUM_CATEGORY_STATUS }) => {
  const colorClass = getCategoryStatusColor(status);
  const formattedStatus = status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap  ${colorClass}`}>{formattedStatus}</span>;
};
