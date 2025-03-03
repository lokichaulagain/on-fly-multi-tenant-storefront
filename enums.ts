export enum ENUM_SUBSCRIPTION_PLAN {
  FREE = "free",
  PREMIUM = "premium",
  ENTERPRISE = "enterprise",
}

export enum ENUM_SUBSCRIPTION_STATUS {
  TRIAL = "trial",
  ACTIVE = "active",
  EXPIRED = "expired",
}

export enum ENUM_STORE_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETED = "deleted",
}

export enum ENUM_PRODUCT_STATUS {
  DRAFT = "draft",
  ACTIVE = "active",
  INACTIVE = "inactive",
  OUT_OF_STOCK = "out_of_stock",
}

export enum ENUM_SHIPPING_STATUS {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  RETURNED = "returned",
  ON_HOLD = "on_hold",
}

export enum ENUM_PAYMENT_STATUS {
  PENDING = "pending",
  PAID = "paid",
  PARTIALLY_PAID = "partially_paid",
  REFUNDED = "refunded",
  CANCELLED = "cancelled",
  FAILED = "failed",
}
export enum MATRIX_PERIOD {
  LIFETIME = "lifetime",
  TODAY = "today",
  YESTERDAY = "yesterday",
  THIS_WEEK = "thisweek",
  LAST_SEVEN_DAYS = "last7days",
  LAST_WEEK = "lastweek",
  THIS_MONTH = "thismonth",
  LAST_MONTH = "lastmonth",
  THIS_YEAR = "thisyear",
  LAST_YEAR = "lastyear",
  CUSTOM_RANGE = "customrange",
}

export enum ENUM_CATEGORY_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum ENUM_STORE_CATEGORY {
  GENERAL = "general",
  SERVICE = "service",
  RETAIL = "retail",
  FASHION = "fashion",
  ELECTRONICS = "electronics",
  HOME = "home",
  BEAUTY = "beauty",
  HEALTH = "health",
  OTHERS = "others",
}

export enum ENUM_FONT_FAMILY {
  INTER = "Inter",
  ROBOTO = "Roboto",
  POPPINS = "Poppins",
  PLAYFAIR_DISPLAY = "Playfair Display",
  MONTSERRAT = "Montserrat",
}

export enum ENUM_NAVBAR_LAYOUT {
  DEFAULT = "default",
  CENTERED = "centered",
  MINIMAL = "minimal",
}

export enum ENUM_FOOTER_LAYOUT {
  DEFAULT = "default",
  CENTERED = "centered",
  MINIMAL = "minimal",
}

export enum ENUM_BUTTON_STYLE {
  ROUNDED = "rounded",
  SQUARE = "square",
  PILL = "pill",
}

export enum ENUM_PRODUCT_CARD_STYLE {
  MINIMAL = "minimal",
  DETAILED = "detailed",
  OVERLAY = "overlay",
}

export enum ENUM_PRODUCT_ASPECT_RATIO {
  SQUARE = "1:1",
  PORTRAIT = "3:4",
  LANDSCAPE = "4:3",
  WIDESCREEN = "16:9",
}
