import { DEFAULT_STORE_LOGO, colorTemplates, DEFAULT_PRODUCT_ASPECT_RATIO, DEFAULT_FONT_FAMILY, DEFAULT_BORDER_RADIUS, DEFAULT_BANNER_CONTENT } from "@/constants";
import { ENUM_PRODUCT_STATUS, ENUM_SHIPPING_STATUS, ENUM_STORE_STATUS, ENUM_SUBSCRIPTION_PLAN, ENUM_SUBSCRIPTION_STATUS, ENUM_STORE_CATEGORY, ENUM_PAYMENT_STATUS, ENUM_CATEGORY_STATUS, ENUM_COLLECTION_STATUS } from "@/enums";
import { IOrderItem, IShippingAndBillingAddress } from "@/interfaces/order";
import { IStoreAppearance, IStoreSocialLinks } from "@/interfaces/store";
import { sql } from "drizzle-orm";
import { pgTable, decimal, varchar, text, timestamp, integer, jsonb, index, boolean, uuid, AnyPgColumn, primaryKey, uniqueIndex } from "drizzle-orm/pg-core";

export const storesTable = pgTable(
  "stores",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey().unique().notNull(), // assign org_id from clerk
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
    store_status: varchar("store_status", {
      length: 12,
      enum: Object.values(ENUM_STORE_STATUS) as [string, ...string[]],
    })
      .notNull()
      .default(ENUM_STORE_STATUS.ACTIVE),
    store_logo: varchar("store_logo", { length: 255 }).default(DEFAULT_STORE_LOGO).notNull(),

    // Optional
    store_description: varchar("store_description", { length: 2000 }),
    custom_domain: varchar("custom_domain", { length: 50 }).unique(),

    // Social
    social_links: jsonb("social_links").$type<IStoreSocialLinks>().default({
      facebook_url: null,
      instagram_url: null,
      tiktok_url: null,
      youtube_url: null,
      primary_whatsapp_number: null,
      google_map_url: null,
    }),

    // SEO
    store_meta_title: varchar("store_meta_title", { length: 70 }),
    store_meta_description: varchar("store_meta_description", { length: 255 }),
    store_meta_image: varchar("store_meta_image", { length: 255 }).default(DEFAULT_STORE_LOGO),

    // 🛒 Business setting
    payment_methods: jsonb("payment_methods").default(["cod"]),
    order_prefix: varchar("order_prefix", { length: 10 }),
    subscription_plan: varchar("subscription_plan", {
      length: 20,
      enum: Object.values(ENUM_SUBSCRIPTION_PLAN) as [string, ...string[]],
    })
      .notNull()
      .default(ENUM_SUBSCRIPTION_PLAN.FREE),

    subscription_status: varchar("subscription_status", {
      length: 20,
      enum: Object.values(ENUM_SUBSCRIPTION_STATUS) as [string, ...string[]],
    })
      .notNull()
      .default(ENUM_SUBSCRIPTION_STATUS.TRIAL),
    subscription_starts_at: timestamp("subscription_starts_at", { mode: "date" }).notNull().defaultNow(),
    subscription_ends_at: timestamp("subscription_ends_at", { mode: "date" }),

    // Appearance
    store_appearance: jsonb("store_appearance").$type<IStoreAppearance>().default({
      // (Corporate Trust) template by default
      font_family: DEFAULT_FONT_FAMILY,
      primary_color: colorTemplates[0].primary_color,
      secondary_color: colorTemplates[0].secondary_color,
      border_radius: DEFAULT_BORDER_RADIUS,
      product_aspect_ratio: DEFAULT_PRODUCT_ASPECT_RATIO,
      favicon: DEFAULT_STORE_LOGO,
      desktop_banners: [],
      mobile_banners: [],
      banner_content: DEFAULT_BANNER_CONTENT,
    }),

    // Timestamps
    created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "date" }),
  },
  (table) => [
    // Indexes
    index("stores_id_idx").on(table.id),
    index("stores_store_subdomain_idx").on(table.store_subdomain),
    index("stores_custom_domain_idx").on(table.custom_domain),
  ]
);
export type Stores = typeof storesTable.$inferSelect;

export const categoriesTable = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull(),

    parent_id: uuid("parent_id")
      .references((): AnyPgColumn => categoriesTable.id, { onDelete: "set null" })
      .default(sql`NULL`), // Set parent_id to null when category is deleted

    thumbnail: varchar("thumbnail", { length: 255 }),
    store_id: varchar("store_id")
      .notNull()
      .references(() => storesTable.id, { onDelete: "cascade" }), // Delete category when store is deleted

    status: varchar("status", {
      length: 20,
      enum: Object.values(ENUM_CATEGORY_STATUS) as [string, ...string[]],
    })
      .notNull()
      .default(ENUM_CATEGORY_STATUS.ACTIVE),
    sort_order: integer("sort_order").default(0),

    created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "date" }),
  },
  (table) => [
    // Your existing indexes
    index("categories_slug_idx").on(table.slug),
    index("categories_id_idx").on(table.id),
    index("categories_store_id_idx").on(table.store_id),

    // Add composite unique constraints
    uniqueIndex("unique_store_slug").on(table.store_id, table.slug), // Ensures slug is unique per store
    uniqueIndex("unique_store_name").on(table.store_id, table.name), // Ensures name is unique per store
  ]
);
export type Categories = typeof categoriesTable.$inferSelect;

export const collectionsTable = pgTable(
  "collections",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull(),

    store_id: varchar("store_id")
      .notNull()
      .references(() => storesTable.id, { onDelete: "cascade" }), // Delete collection when store is deleted

    status: varchar("status", {
      length: 20,
      enum: Object.values(ENUM_COLLECTION_STATUS) as [string, ...string[]],
    })
      .notNull()
      .default(ENUM_COLLECTION_STATUS.ACTIVE),

    created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "date" }),
  },
  (table) => [
    // Your existing indexes
    index("collections_slug_idx").on(table.slug),
    index("collections_id_idx").on(table.id),
    index("collections_store_id_idx").on(table.store_id),

    // Add composite unique constraints
    uniqueIndex("unique_store_slug_collection").on(table.store_id, table.slug), // Ensures slug is unique per store
    uniqueIndex("unique_store_name_collection").on(table.store_id, table.name), // Ensures name is unique per store
  ]
);
export type Collections = typeof collectionsTable.$inferSelect;

export const productsTable = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),

    store_id: varchar("store_id")
      .notNull()
      .references(() => storesTable.id, { onDelete: "cascade" }), // Delete product when store is deleted

    description: text("description"),

    cost_price: integer("cost_price"),
    selling_price: integer("selling_price"),
    crossed_price: integer("crossed_price"),

    barcode: varchar("barcode", { length: 50 }),
    category_id: uuid("category_id")
      .references(() => categoriesTable.id, { onDelete: "set null" })
      .default(sql`NULL`), // Set category_id to null when category is deleted

    collection_id: uuid("collection_id")
      .references(() => collectionsTable.id, { onDelete: "set null" })
      .default(sql`NULL`), // Set collection_id to null when collection is deleted

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

export const ordersTable = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey().notNull().unique(),

  order_number: varchar("order_number", { length: 50 }).notNull().unique(),
  user_id: varchar("user_id", { length: 255 }).notNull(), // assign user_id from clerk
  store_id: varchar("store_id")
    .notNull()
    .references(() => storesTable.id, { onDelete: "set null" }), // Set null if the store is deleted

  shipping_address: jsonb("shipping_address").$type<IShippingAndBillingAddress>().default({
    full_name: null,
    email_address: null,
    phone_number: null,
    province: null,
    district: null,
    city: null,
    landmark: null,
    postal_code: null,
  }),

  billing_address: jsonb("billing_address").$type<IShippingAndBillingAddress>().default({
    full_name: null,
    email_address: null,
    phone_number: null,
    province: null,
    district: null,
    city: null,
    landmark: null,
    postal_code: null,
  }),

  order_items: jsonb("order_items").$type<IOrderItem[]>().default([]),
  shipping_cost: integer("shipping_cost"),

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

  created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  deleted_at: timestamp("deleted_at", { mode: "date" }),
});
export type Orders = typeof ordersTable.$inferSelect;

export const productsToCategoriesTable = pgTable(
  "products_to_categories",
  {
    product_id: uuid("product_id").references(() => productsTable.id, { onDelete: "cascade" }),
    category_id: uuid("category_id").references(() => categoriesTable.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.product_id, table.category_id] })]
);
export type ProductsToCategories = typeof productsToCategoriesTable.$inferSelect;

export const pagesTable = pgTable(
  "pages",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
    title: varchar("title", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull(),

    content: varchar("content", { length: 5000 }),
    store_id: varchar("store_id", { length: 255 })
      .notNull()
      .references(() => storesTable.id, { onDelete: "cascade" }), // Delete page when store is deleted

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

export const reviewsTable = pgTable(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
    user_id: varchar("user_id", { length: 255 }).notNull(),
    store_id: varchar("store_id", { length: 255 })
      .notNull()
      .references(() => storesTable.id, { onDelete: "cascade" }), // Delete review when store is deleted
    product_id: uuid("product_id")
      .notNull()
      .references(() => productsTable.id, { onDelete: "cascade" }), // Delete review when product is deleted
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

export const subscriptionPlansTable = pgTable("subscription_plans", {
  id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),

  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration_days: integer("duration_days").notNull(),

  created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  deleted_at: timestamp("deleted_at", { mode: "date" }),
});
export type SubscriptionPlans = typeof subscriptionPlansTable.$inferSelect;

export const subscriptionsTable = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
  store_id: varchar("store_id")
    .notNull()
    .references(() => storesTable.id, { onDelete: "set null" }), // Set null if the store is deleted
  subscription_plan_id: uuid("subscription_plan_id")
    .notNull()
    .references(() => subscriptionPlansTable.id, { onDelete: "set null" }), // Set null if the subscription plan is deleted

  status: varchar("status", {
    length: 20,
    enum: Object.values(ENUM_SUBSCRIPTION_STATUS) as [string, ...string[]],
  })
    .notNull()
    .default(ENUM_SUBSCRIPTION_STATUS.ACTIVE),

  start_date: timestamp("start_date", { mode: "date" }).notNull().defaultNow(),
  end_date: timestamp("end_date", { mode: "date" }),

  created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  deleted_at: timestamp("deleted_at", { mode: "date" }),
});
export type Subscriptions = typeof subscriptionsTable.$inferSelect;

export const paymentsTable = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
  store_id: varchar("store_id")
    .notNull()
    .references(() => storesTable.id, { onDelete: "set null" }),

  subscription_id: uuid("subscription_id")
    .notNull()
    .references(() => subscriptionsTable.id, { onDelete: "set null" }),

  subscription_plan_id: uuid("subscription_plan_id")
    .notNull()
    .references(() => subscriptionPlansTable.id, { onDelete: "set null" }),

  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  payment_reference: varchar("payment_reference", { length: 255 }), // eSewa transaction ID
  provider: varchar("provider", { length: 20 }).notNull(), // esewa, khalti , etc.
  status: varchar("status", { length: 20 }).notNull(), // completed, failed, etc.

  created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  deleted_at: timestamp("deleted_at", { mode: "date" }),
});
export type Payments = typeof paymentsTable.$inferSelect;
