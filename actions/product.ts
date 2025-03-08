"use server";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { Products, productsTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { ActionResponse, getStoreIdFromSubdomain } from ".";
import { IProductPreview } from "@/interfaces/product";
import { ENUM_PRODUCT_STATUS } from "@/enums";
import { unstable_cache } from "next/cache";
import { CACHE_REVALIDATION_TIME } from "./constant";

// ✅
export async function getActiveStoreProductsWithPreviewData(): Promise<ActionResponse<IProductPreview[]>> {
  // 1. Get store_id from subdomain
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
  }

  try {
    // 2. Get active store cached products or database products
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
          .where(and(eq(productsTable.store_id, store_id), isNull(productsTable.deleted_at), eq(productsTable.status, ENUM_PRODUCT_STATUS.ACTIVE)))
          .orderBy(desc(productsTable.created_at));
      },
      // Cache key unique identifier for the store
      [`active-store-products-${store_id}`],
      {
        // Cache tags for invalidation
        tags: [`active-store-products-${store_id}`],
        // Cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    // 3. Get products
    const products = await getProducts();

    // 4. Return products with preview data
    return { data: products, status: 200, msg: "Products fetched successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error fetching active store products for store ${store_id} : Error: ${error}`);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

// ✅
export async function getProductBySlug(slug: string): Promise<ActionResponse<Products>> {
  // 1. Get store_id from subdomain
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
  }

  try {
    // 2. Get product by slug from cache or database
    const getProduct = unstable_cache(
      async () => {
        const [product] = await db
          .select()
          .from(productsTable)
          .where(and(eq(productsTable.slug, slug), eq(productsTable.store_id, store_id), eq(productsTable.status, ENUM_PRODUCT_STATUS.ACTIVE), isNull(productsTable.deleted_at)))
          .limit(1);
        return product;
      },
      // Cache key
      [`get-product-by-slug-${slug}`],
      {
        // Cache tags for invalidation
        tags: [`get-product-by-slug-${slug}`],

        // Cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    // 3. Get product
    const product = await getProduct();

    // 4. Return product
    return { data: product, status: 200, msg: "Product fetched successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error fetching product by slug ${slug} for store ${store_id} : Error: ${error}`);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
