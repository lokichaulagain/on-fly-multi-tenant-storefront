"use server";
import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { categoriesTable, productsTable, productsToCategories } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { ActionResponse } from ".";
import { IProductPreview } from "@/interfaces/product";
import { ENUM_CATEGORY_STATUS, ENUM_PRODUCT_STATUS } from "@/enums";
import { unstable_cache } from "next/cache";
import { getStoreIdBySubdomain, getStoreSubdomainFromHeaders } from "./store";

// Cache configuration
const CACHE_REVALIDATION_TIME = 60 * 60 * 24; // 24 hours

/*
  Get Active store products action with preview data with cache
  1. Get store subdomain from headers
  2. Get store id by subdomain
  3. Get active store products with preview data sort by created_at desc
*/
export async function getActiveStoreProductsWithPreviewData(): Promise<ActionResponse<IProductPreview[]>> {
  try {
    // 1. Get store subdomain from headers
    const store_subdomain = await getStoreSubdomainFromHeaders();

    // 2. Get store id by subdomain
    const response = await getStoreIdBySubdomain(store_subdomain);
    const store_id = response.data;

    if (!store_id) {
      return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
    }

    // 3. Get active store products with preview data sort by created_at desc
    const getProducts = unstable_cache(
      async () => {
        return await db
          .select({
            id: productsTable.id,
            name: productsTable.name,
            slug: productsTable.slug,
            selling_price: productsTable.selling_price,
            crossed_price: productsTable.crossed_price,
            image_url: sql<string>`${productsTable.image_urls}->0`,
          })
          .from(productsTable)
          .where(and(eq(productsTable.store_id, store_id), eq(productsTable.status, ENUM_PRODUCT_STATUS.ACTIVE)))
          .orderBy(desc(productsTable.created_at));
      },
      // Cache key unique identifier for the store
      [`active-store-products-${store_subdomain}`],
      {
        // Cache tags for invalidation
        tags: [`active-store-products-${store_subdomain}`],
        // Cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    // 4. Get products
    const products = await getProducts();

    // 5. Return products with preview data
    return { data: products, status: 200, msg: "Products fetched successfully", error: null };
  } catch (error: unknown) {
    console.error("Error fetching active store products:", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

export async function getActiveStoreProductsByCategorySlug(categorySlug: string): Promise<ActionResponse<IProductPreview[]>> {
  try {
    // 1. Get store subdomain from headers
    const store_subdomain = await getStoreSubdomainFromHeaders();

    // 2. Get store id by subdomain
    const response = await getStoreIdBySubdomain(store_subdomain);
    const store_id = response.data;

    if (!store_id) {
      return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
    }

    // 3. Get category ID by slug
    const categoryResponse = await db
      .select({
        id: categoriesTable.id,
      })
      .from(categoriesTable)
      .where(and(eq(categoriesTable.store_id, store_id), eq(categoriesTable.slug, categorySlug), eq(categoriesTable.status, ENUM_CATEGORY_STATUS.ACTIVE)))
      .limit(1);

    if (!categoryResponse || categoryResponse.length === 0) {
      return { data: [], status: 404, msg: "Category not found", error: "Category not found" };
    }

    const category_id = categoryResponse[0].id;

    // 4. Get active store products with preview data for this category, sorted by created_at desc
    const getProducts = unstable_cache(
      async () => {
        return await db
          .select({
            name: productsTable.name,
            slug: productsTable.slug,
            selling_price: productsTable.selling_price,
            crossed_price: productsTable.crossed_price,
            image_url: sql<string>`${productsTable.image_urls}->0`,
          })
          .from(productsTable)
          .innerJoin(productsToCategories, eq(productsTable.id, productsToCategories.product_id))
          .where(and(eq(productsTable.store_id, store_id), eq(productsTable.status, ENUM_PRODUCT_STATUS.ACTIVE), eq(productsToCategories.category_id, category_id)))
          .orderBy(desc(productsTable.created_at));
      },
      // Cache key unique identifier for the store and category
      [`active-store-products-${store_subdomain}-category-${categorySlug}`],
      {
        // Cache tags for invalidation
        tags: [`active-store-products-${store_subdomain}`, `category-products-${categorySlug}`],
        // Cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    // 5. Get products
    const products = await getProducts();

    // 6. Return products with preview data
    return { data: products as IProductPreview[], status: 200, msg: "Products fetched successfully", error: null };
  } catch (error: unknown) {
    console.error("Error fetching active store products by category:", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

/*
  Get product by slug action with cache
  1. Get product by slug from cache or database
  2. Return product
*/
export async function getProductBySlug(slug: string): Promise<ActionResponse<any>> {
  try {
    console.log("hereeeeee");
    // 1. Get product by slug from cache or database
    const [product] = await db.select().from(productsTable).where(eq(productsTable.slug, slug)).limit(1);

    // 2. Return product
    return { data: product, status: 200, msg: "Product fetched successfully", error: null };
  } catch (error: unknown) {
    console.error("Error fetching product by slug:", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
