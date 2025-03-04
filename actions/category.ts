"use server";
import { eq, desc, and } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { categoriesTable, storesTable } from "@/lib/db/schema";
import { ActionResponse } from ".";
import { ICategoryPreview } from "@/interfaces/category";
import { ENUM_CATEGORY_STATUS } from "@/enums";
import { handleDbError } from "@/utils/db-error";
import { headers } from "next/headers";
import { unstable_cache } from "next/cache";
/*
  Get Active store categories 
  1. Get subdomain from headers
  2. Get store id by subdomain
  3. Get active store categories from cache or database
*/
export async function getActiveStoreCategoriesWithPreviewData(): Promise<ActionResponse<ICategoryPreview[]>> {
  try {
    // 1. Get subdomain from headers
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const store_subdomain = host.split(".")[0];

    // 2. Get store id by subdomain from cache or database
    const response = await getStoreIdBySubdomain(store_subdomain);
    const store_id = response.data;

    // 3. If store not found, return error
    if (!store_id) {
      return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
    }

    // 4. Get active store categories from cache or database
    const categories = await db
      .select({
        name: categoriesTable.name,
        slug: categoriesTable.slug,
        thumbnail: categoriesTable.thumbnail,
      })
      .from(categoriesTable)
      .where(and(eq(categoriesTable.store_id, store_id), eq(categoriesTable.status, ENUM_CATEGORY_STATUS.ACTIVE)))
      .orderBy(desc(categoriesTable.created_at));

    // 2. Return categories
    return { data: categories, status: 200, msg: "Categories fetched successfully", error: null };
  } catch (error: unknown) {
    console.log("Error fetching categories:", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

/*
  Get store id by store_subdomain from cache or database
*/
export async function getStoreIdBySubdomain(store_subdomain: string): Promise<ActionResponse<string>> {
  try {
    // 1. Get store id by store_subdomain from cache or database
    const getStore = unstable_cache(
      async () => await db.select({ id: storesTable.id }).from(storesTable).where(eq(storesTable.store_subdomain, store_subdomain)).limit(1),

      // Cache key unique identifier for the store
      [`store-id-${store_subdomain}`],
      {
        // Cache tags for invalidation
        tags: [`store-id-${store_subdomain}`],
        // Cache revalidation time
        revalidate: 60 * 60 * 24, // 24 hours
      }
    );

    const [store] = await getStore();

    // 2. Return store id
    return { data: store.id, status: 200, msg: "Store ID fetched successfully", error: null };
  } catch (error: unknown) {
    console.log("Error fetching store ID:", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
