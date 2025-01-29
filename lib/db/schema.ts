import { DEFAULT_STORE_LOGO } from "@/constants";
import { ENUM_STORE_CATEGORY, ENUM_SUBSCRIPTION_PLAN, ENUM_SUBSCRIPTION_STATUS, ENUM_STORE_STATUS, ENUM_PRODUCT_STATUS } from "@/enums";
// import { ENUM_PRODUCT_STATUS, ENUM_STORE_CATEGORY, ENUM_STORE_STATUS, ENUM_SUBSCRIPTION_PLAN, ENUM_SUBSCRIPTION_STATUS } from "@/enums";
import { pgTable, serial, decimal, varchar, text, date, timestamp, integer, jsonb, index, unique, boolean, uuid, uniqueIndex, pgEnum } from "drizzle-orm/pg-core";

// ✅ Stores Table
export const storesTable = pgTable(
  "stores",
  {
    // 🛒 Required fields
    id: varchar("id", { length: 255 }).notNull().unique(), // assign org_id from clerk

    // 🛒 Required fields
    store_name: varchar("store_name", { length: 100 }).notNull(),
    store_subdomain: varchar("store_subdomain", { length: 100 }).notNull().unique(),
    store_category: varchar("store_category", {
      length: 50,
      enum: Object.values(ENUM_STORE_CATEGORY) as [string, ...string[]],
    })
      .notNull()
      .default(ENUM_STORE_CATEGORY.GENERAL),
    store_phone_number: varchar("store_phone_number", { length: 10 }).notNull(),
    store_address: varchar("store_address", { length: 100 }).notNull(),
    user_id: varchar("user_id", { length: 255 }).notNull(),

    // 🛒 Optional fields
    store_logo: varchar("store_logo", { length: 255 }).default(DEFAULT_STORE_LOGO),
    theme_settings: jsonb("theme_settings").default({}),
    custom_domain: varchar("custom_domain", { length: 50 }).unique(),
    social_links: jsonb("social_links").default({}),
    store_meta_description: varchar("store_meta_description", { length: 255 }),
    store_meta_image: varchar("store_meta_image", { length: 255 }),

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
    thumbnail: varchar("thumbnail", { length: 255 }).notNull(),
    user_id: varchar("user_id", { length: 255 }).notNull(),
    store_id: varchar("store_id")
      .notNull()
      .references(() => storesTable.id),

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
    thumbnail: varchar("thumbnail", { length: 255 }).notNull(),
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

    category_id: uuid("category_id").references(() => categoriesTable.id),
    continue_selling_even_out_of_stock: boolean("continue_selling_even_out_of_stock").default(false),

    meta_title: varchar("meta_title", { length: 255 }),
    meta_description: varchar("meta_description", { length: 255 }),

    images: jsonb("images").default([]),
    has_variants: boolean("has_variants").default(false),

    status: varchar("status", {
      length: 10,
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
export const ordersTable = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull().unique(),

    // 🛒 Required fields
    order_number: varchar("order_number", { length: 50 }).notNull().unique(),
    user_id: varchar("user_id", { length: 255 }).notNull(), // assign user_id from clerk
    store_id: varchar("store_id")
      .notNull()
      .references(() => storesTable.id),

    // 🛒 Payment information
    payment_id: varchar("payment_id", { length: 255 }),
    payment_status: varchar("payment_status", { length: 50 }),
    payment_method: varchar("payment_method", { length: 50 }),
    payment_amount: integer("payment_amount"),

    // 🛒 Address information
    shipping_address: jsonb("shipping_address"),
    billing_address: jsonb("billing_address"),

    // 🛒 Order details
    order_items: jsonb("order_items"),
    subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
    tax_amount: decimal("tax_amount", { precision: 10, scale: 2 }).notNull(),
    tax_rate: decimal("tax_rate", { precision: 5, scale: 2 }).notNull(),
    discount_amount: decimal("discount_amount", { precision: 10, scale: 2 }),

    // 🛒 Shipping
    shipping_method: varchar("shipping_method", { length: 50 }),
    shipping_cost: decimal("shipping_cost", { precision: 10, scale: 2 }),
    total_amount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),

    // 🛒 Order status
    // order_status: pgEnum("order_status", ["pending", "processing", "completed", "cancelled", "refunded", "failed"]),

    // 🛒
    created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "date" }),
  },
  (table) => [
    // Index for order_number only
    index("orders_order_number_idx").on(table.order_number),

    // Fast queries filtering by id
    index("orders_id_idx").on(table.id),

    // Fast queries filtering by store_id
    index("orders_store_id_idx").on(table.store_id),

    // Fast queries filtering by user_id
    index("orders_user_id_idx").on(table.user_id),
    
  ]
);
export type Orders = typeof ordersTable.$inferSelect;