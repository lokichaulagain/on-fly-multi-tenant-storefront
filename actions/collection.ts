"use server";
import { db } from "@/lib/db/drizzle";
import { Collections, collectionsTable, productsTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { CACHE_REVALIDATION_TIME } from "./constant";
import { ActionResponse, getStoreIdFromSubdomain } from ".";

// ✅
export async function getCollectionsWithProductsPreviewData(): Promise<ActionResponse<Collections[]>> {
  // 1. Get store_id
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
  }

  try {
    // 2. Get the collections with associated products from the cache or database
    const getCachedCollectionsWithProducts = unstable_cache(
      async () => {
        return await db
          .select({
            collection: collectionsTable,
            product: {
              id: productsTable.id,
              name: productsTable.name,
              slug: productsTable.slug,
              image_url: sql<string>`${productsTable.image_urls}->0`,
              crossed_price: productsTable.crossed_price,
              selling_price: productsTable.selling_price,

            },
          })
          .from(collectionsTable)
          .leftJoin(productsTable, eq(collectionsTable.id, productsTable.collection_id))
          .where(and(eq(collectionsTable.store_id, store_id), isNull(collectionsTable.deleted_at)))
          .orderBy(desc(collectionsTable.created_at));
      },
      // cache key
      [`active-store-collections-with-products-${store_id}`],

      {
        // cache tag for invalidation
        tags: [`active-store-collections-with-products-${store_id}`],
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    const collectionsWithProducts = await getCachedCollectionsWithProducts();

    // 3. Group products by their collection
    const groupedCollections = collectionsWithProducts.reduce((acc, { collection, product }) => {
      if (!acc[collection.id]) {
        acc[collection.id] = { ...collection, products: [] };
      }
      if (product) {
        acc[collection.id].products.push(product as any );
      }
      return acc;
    }, {} as Record<string, Collections & { products: (typeof productsTable.$inferSelect)[] }>);

    return {
      data: Object.values(groupedCollections),
      status: 200,
      msg: "Active store collections with products fetched successfully",
      error: null,
    };
  } catch (error: unknown) {
    console.error(`Error fetching active store collections with products for orgId: ${store_id}`, error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
