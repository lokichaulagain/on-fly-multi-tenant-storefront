import {  DEFAULT_STORE_LOGO, border_radius, product_aspect_ratio, font_family, colorTemplates } from "@/constants";
import { ENUM_PRODUCT_STATUS, ENUM_SHIPPING_STATUS, ENUM_STORE_STATUS, ENUM_SUBSCRIPTION_PLAN, ENUM_SUBSCRIPTION_STATUS, ENUM_STORE_CATEGORY, ENUM_PAYMENT_STATUS, ENUM_CATEGORY_STATUS, ENUM_COLLECTION_STATUS } from "@/enums";
import { IOrderItem, IShippingAndBillingAddress } from "@/interfaces/order";
import { IStoreAppearance, IStoreSocialLinks } from "@/interfaces/store";
import { sql } from "drizzle-orm";
import { pgTable, decimal, varchar, text, timestamp, integer, jsonb, index, boolean, uuid, AnyPgColumn, primaryKey, uniqueIndex } from "drizzle-orm/pg-core";
















// import { font_family, DEFAULT_STORE_LOGO, border_radius, product_aspect_ratio, colorTemplates } from "@/constants";
// import { ENUM_PRODUCT_STATUS, ENUM_SHIPPING_STATUS, ENUM_STORE_STATUS, ENUM_SUBSCRIPTION_PLAN, ENUM_SUBSCRIPTION_STATUS, ENUM_STORE_CATEGORY, ENUM_PAYMENT_STATUS, ENUM_CATEGORY_STATUS, ENUM_COLLECTION_STATUS } from "@/enums";
// import { IOrderItem, IShippingAndBillingAddress } from "@/interfaces/order";
// import { IStoreAppearance, IStoreSocialLinks } from "@/interfaces/store";
// import { sql } from "drizzle-orm";
// import { pgTable, varchar, text, timestamp, integer, jsonb, index, boolean, uuid, AnyPgColumn, primaryKey, uniqueIndex, decimal } from "drizzle-orm/pg-core";

// ✅ Stores Table
export const storesTable = pgTable(
  "stores",
  {
    // 🛒 Required fields
    id: varchar("id", { length: 255 }).notNull().primaryKey().unique().notNull(), // assign org_id from clerk

    // 🛒 Required fields
    store_name: varchar("store_name", { length: 100 }).notNull(),
    store_subdomain: varchar("store_subdomain", { length: 100 }).notNull().unique(),
    store_category: varchar("store_category", {
      length: 20,
      enum: Object.values(ENUM_STORE_CATEGORY) as [string, ...string[]],
    })
      .notNull()
      .default(ENUM_STORE_CATEGORY.GENERAL),

    store_phone_number: varchar("store_phone_number", { length: 10 }).notNull(),
    store_address: varchar("store_address", { length: 100 }).notNull(),
    user_id: varchar("user_id", { length: 255 }).notNull(),

    // 🛒 Optional fields
    store_logo: varchar("store_logo", { length: 255 }).default(DEFAULT_STORE_LOGO).notNull(),
    store_description: varchar("store_description", { length: 2000 }),
    theme_settings: jsonb("theme_settings").default({}),
    custom_domain: varchar("custom_domain", { length: 50 }).unique(),
    // social_links: jsonb("social_links")
    social_links: jsonb("social_links").$type<IStoreSocialLinks>().default({
      facebook_url: "",
      instagram_url: "",
      tiktok_url: "",
      youtube_url: "",
      primary_whatsapp_number: "",
      google_map_url: "",
    }),
    store_meta_title: varchar("store_meta_title", { length: 70 }),
    store_meta_description: varchar("store_meta_description", { length: 255 }),
    store_meta_image: varchar("store_meta_image", { length: 255 }).default(DEFAULT_STORE_LOGO),
    has_variants: boolean("has_variants").default(false).notNull(),

    // 🛒 Business setting
    payment_methods: jsonb("payment_methods").default(["cod"]),
    order_prefix: varchar("order_prefix", { length: 50 }),
    subscription_plan: varchar("subscription_plan", {
      length: 50,
      enum: Object.values(ENUM_SUBSCRIPTION_PLAN) as [string, ...string[]],
    })
      .notNull()
      .default(ENUM_SUBSCRIPTION_PLAN.FREE),
    subscription_status: varchar("subscription_status", {
      length: 50,
      enum: Object.values(ENUM_SUBSCRIPTION_STATUS) as [string, ...string[]],
    })
      .notNull()
      .default(ENUM_SUBSCRIPTION_STATUS.TRIAL),
    tax_id: varchar("tax_id", { length: 50 }),

    // 🛒 Status and tracking
    trial_ends_at: timestamp("trial_ends_at", { mode: "date" }),
    store_status: varchar("store_status", {
      length: 50,
      enum: Object.values(ENUM_STORE_STATUS) as [string, ...string[]],
    })
      .notNull()
      .default(ENUM_STORE_STATUS.ACTIVE),
    created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "date" }),

    store_appearance: jsonb("store_appearance").$type<IStoreAppearance>().default({
      font_family: font_family,
      // By default, use the first color template (Corporate Trust)
      primary_color: colorTemplates[0].primary_color,
      secondary_color: colorTemplates[0].secondary_color,
      border_radius: border_radius,
      product_aspect_ratio: product_aspect_ratio,
      favicon: DEFAULT_STORE_LOGO,
      desktop_banners: [],
      mobile_banners: [],
    }),
  },
  (table) => [
    // Fast queries filtering by id
    index("stores_id_idx").on(table.id),

    // Fast queries filtering by store_subdomain
    index("stores_store_subdomain_idx").on(table.store_subdomain),

    //Fast queries filtering by user_id
    index("stores_user_id_idx").on(table.user_id),

    //Fast queries filtering by subscription_plan
    index("stores_subscription_plan_idx").on(table.subscription_plan),
  ]
);
export type Stores = typeof storesTable.$inferSelect;

// ✅ Categories Table
export const categoriesTable = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull().unique(),

    // 🛒 Required fields
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    // parent_id: text("parent_id").references((): AnyPgColumn => categoriesTable.id, { onDelete: 'set null' }).default(sql`NULL`),
    parent_id: uuid("parent_id")
      .references((): AnyPgColumn => categoriesTable.id, { onDelete: "set null" })
      .default(sql`NULL`),

    thumbnail: varchar("thumbnail", { length: 255 }),
    user_id: varchar("user_id", { length: 255 }).notNull(),
    store_id: varchar("store_id")
      .notNull()
      .references(() => storesTable.id),

    status: varchar("status", {
      length: 20,
      enum: Object.values(ENUM_CATEGORY_STATUS) as [string, ...string[]],
    })
      .notNull()
      .default(ENUM_CATEGORY_STATUS.ACTIVE),

    // 🛒
    sort_order: integer("sort_order").default(0),
    created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "date" }),
  },
  (table) => [
    // Index for slug only
    index("categories_slug_idx").on(table.slug),

    // Fast queries filtering by id
    index("categories_id_idx").on(table.id),

    // Fast queries filtering by store_id
    index("categories_store_id_idx").on(table.store_id),
  ]
);
export type Categories = typeof categoriesTable.$inferSelect;

// ✅ Products Table
export const productsTable = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull().unique(),

    // 🛒 Required fields
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    // thumbnail: varchar("thumbnail", { length: 255 }).notNull(),
    user_id: varchar("user_id", { length: 255 }).notNull(),
    store_id: varchar("store_id")
      .notNull()
      .references(() => storesTable.id),

    // 🛒 Optianal fields
    description: text("description"),
    cost_price: integer("cost_price"),
    selling_price: integer("selling_price"),
    crossed_price: integer("crossed_price"),
    stock: integer("stock"),
    sku: varchar("sku", { length: 50 }),
    barcode: varchar("barcode", { length: 50 }),

    category_id: uuid("category_id")
      .references(() => categoriesTable.id, { onDelete: "set null" })
      .default(sql`NULL`),

    collection_id: uuid("collection_id")
      .references(() => collectionsTable.id, { onDelete: "set null" })
      .default(sql`NULL`),

    continue_selling_even_out_of_stock: boolean("continue_selling_even_out_of_stock").default(false),

    // images: jsonb("images").default([]),
    has_variants: boolean("has_variants").default(false),
    image_urls: jsonb("image_urls").$type<string[]>().default([]),

    status: varchar("status", {
      length: 20,
      enum: Object.values(ENUM_PRODUCT_STATUS) as [string, ...string[]],
    })
      .notNull()
      .default(ENUM_PRODUCT_STATUS.ACTIVE),

    created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "date" }),
  },
  (table) => [
    // Index for slug only
    index("products_slug_idx").on(table.slug),

    // Fast queries filtering by id
    index("products_id_idx").on(table.id),

    // Fast queries filtering by store_id
    index("products_store_id_idx").on(table.store_id),

    // Fast queries filtering by category_id
    index("products_category_id_idx").on(table.category_id),
  ]
);
export type Products = typeof productsTable.$inferSelect;

// ✅ Orders Table
export const ordersTable = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey().notNull().unique(),

  // 🛒 Required fields
  order_number: varchar("order_number", { length: 50 }).notNull().unique(),
  user_id: varchar("user_id", { length: 255 }).notNull(), // assign user_id from clerk
  store_id: varchar("store_id")
    .notNull()
    .references(() => storesTable.id), // assign store_id from clerk organization

  shipping_address: jsonb("shipping_address").$type<IShippingAndBillingAddress>().default({
    full_name: "",
    email_address: "",
    phone_number: null,
    province: "",
    district: "",
    city: "",
    landmark: "",
    postal_code: "",
  }),

  billing_address: jsonb("billing_address").$type<IShippingAndBillingAddress>().default({
    full_name: "",
    email_address: "",
    phone_number: null,
    province: "",
    district: "",
    city: "",
    landmark: "",
    postal_code: "",
  }),

  // 🛒 Order details
  order_items: jsonb("order_items").$type<IOrderItem[]>().default([]),
  // subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  // tax_amount: decimal("tax_amount", { precision: 10, scale: 2 }).notNull(),
  // tax_rate: decimal("tax_rate", { precision: 5, scale: 2 }).notNull(),
  // discount_amount: decimal("discount_amount", { precision: 10, scale: 2 }),

  // 🛒 Shipping
  // shipping_method: varchar("shipping_method", { length: 50 }),
  shipping_cost: integer("shipping_cost"),
  promo_code: varchar("promo_code", { length: 50 }),
  // total_amount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),

  // 🛒 Order status
  // order_status: pgEnum("order_status", ["pending", "processing", "completed", "cancelled", "refunded", "failed"]),

  shipping_status: varchar("shipping_status", {
    length: 20,
    enum: Object.values(ENUM_SHIPPING_STATUS) as [string, ...string[]],
  })
    .notNull()
    .default(ENUM_SHIPPING_STATUS.PENDING),

  payment_status: varchar("payment_status", {
    length: 20,
    enum: Object.values(ENUM_PAYMENT_STATUS) as [string, ...string[]],
  })
    .notNull()
    .default(ENUM_PAYMENT_STATUS.PENDING),

  // 🛒
  created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  deleted_at: timestamp("deleted_at", { mode: "date" }),
});
export type Orders = typeof ordersTable.$inferSelect;

// Join table for many-to-many relationship
export const productsToCategories = pgTable(
  "products_to_categories",
  {
    product_id: uuid("product_id").references(() => productsTable.id, { onDelete: "cascade" }),
    category_id: uuid("category_id").references(() => categoriesTable.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.product_id, table.category_id] })]
);
export type ProductsToCategories = typeof productsToCategories.$inferSelect;

// ✅ Pages Table
export const pagesTable = pgTable(
  "pages",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
    title: varchar("title", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull(),
    content: varchar("content", { length: 5000 }),
    store_id: varchar("store_id", { length: 255 })
      .notNull()
      .references(() => storesTable.id),
    created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "date" }),
  },
  (table) => [
    // Unique constraint for slug and store_id
    uniqueIndex("store_slug_unique").on(table.store_id, table.slug),

    // Unique constraint for title and store_id
    uniqueIndex("store_title_unique").on(table.store_id, table.title),
  ]
);
export type Pages = typeof pagesTable.$inferSelect;

// ✅ WishList Table
export const wishListTable = pgTable(
  "wish_list",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
    user_id: varchar("user_id", { length: 255 }).notNull(),
    store_id: varchar("store_id", { length: 255 })
      .notNull()
      .references(() => storesTable.id),
    product_id: uuid("product_id")
      .notNull()
      .references(() => productsTable.id),

    created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "date" }),
  },
  (table) => [
    // Unique constraint for user_id and store_id
    uniqueIndex("user_id_store_id_unique").on(table.user_id, table.store_id),

    // Unique constraint for product_id and store_id
    uniqueIndex("product_id_store_id_unique").on(table.product_id, table.store_id),
  ]
);
export type WishList = typeof wishListTable.$inferSelect;

// ✅ Reviews Table
export const reviewsTable = pgTable(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
    user_id: varchar("user_id", { length: 255 }).notNull(),
    store_id: varchar("store_id", { length: 255 })
      .notNull()
      .references(() => storesTable.id),
    product_id: uuid("product_id")
      .notNull()
      .references(() => productsTable.id),
    rating: integer("rating").notNull(),
    review: text("review").default(""),
    created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "date" }),
  },
  (table) => [
    // Unique constraint for user_id and store_id and product_id
    uniqueIndex("user_id_store_id_product_id_unique").on(table.user_id, table.store_id, table.product_id),

    // Fast queries filtering by user_id
    index("reviews_user_id_idx").on(table.user_id),

    // Fast queries filtering by store_id
    index("reviews_store_id_idx").on(table.store_id),

    // Fast queries filtering by product_id
    index("reviews_product_id_idx").on(table.product_id),
  ]
);
export type Reviews = typeof reviewsTable.$inferSelect;

// ✅ Collection Table
export const collectionsTable = pgTable("collections", {
  id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  store_id: varchar("store_id")
    .notNull()
    .references(() => storesTable.id),

  status: varchar("status", {
    length: 20,
    enum: Object.values(ENUM_COLLECTION_STATUS) as [string, ...string[]],
  })
    .notNull()
    .default(ENUM_COLLECTION_STATUS.ACTIVE),

  created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  deleted_at: timestamp("deleted_at", { mode: "date" }),
});
export type Collections = typeof collectionsTable.$inferSelect;

// ✅ Subscription Plans Table
export const subscriptionPlans = pgTable("subscription_plans", {
  id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration_days: integer("duration_days").notNull(),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  deleted_at: timestamp("deleted_at", { mode: "date" }),
});
export type SubscriptionPlans = typeof subscriptionPlans.$inferSelect;

//
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
  store_id: varchar("store_id")
    .notNull()
    .references(() => storesTable.id),
  subscription_plan_id: uuid("subscription_plan_id")
    .notNull()
    .references(() => subscriptionPlans.id),

  status: varchar("status", {
    length: 20,
    enum: Object.values(ENUM_SUBSCRIPTION_STATUS) as [string, ...string[]],
  })
    .notNull()
    .default(ENUM_SUBSCRIPTION_STATUS.ACTIVE),
  start_date: timestamp("start_date", { mode: "date" }).notNull().defaultNow(),
  end_date: timestamp("end_date", { mode: "date" }),
  payment_reference: text("payment_reference"), // eSewa transaction ID
  created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});
export type Subscriptions = typeof subscriptions.$inferSelect;

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
  subscription_id: uuid("subscription_id")
    .notNull()
    .references(() => subscriptions.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  payment_reference: text("payment_reference"), // eSewa transaction ID
  provider: text("provider").notNull(), // esewa, khalti , etc.
  status: text("status").notNull(), // completed, failed, etc.
  created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});
export type Payments = typeof payments.$inferSelect;
