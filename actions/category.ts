"use server";
import { eq, desc, and } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { categoriesTable } from "@/lib/db/schema";
import { ActionResponse } from ".";
import { ICategoryPreview } from "@/interfaces/category";
import { ENUM_CATEGORY_STATUS } from "@/enums";
import { handleDbError } from "@/utils/db-error";
import { unstable_cache } from "next/cache";
import { getStoreIdBySubdomain, getStoreSubdomainFromHeaders } from "./store";

// Cache configuration
const CACHE_REVALIDATION_TIME = 60 * 60 * 24; // 24 hours

/*
  Get Active store categories action with preview data
  1. Get subdomain from headers
  2. Get store id by subdomain
  3. Get active store categories from cache or database
*/
export async function getActiveStoreCategoriesWithPreviewData(): Promise<ActionResponse<ICategoryPreview[]>> {
  try {
    // 1. Get subdomain from headers
    const store_subdomain = await getStoreSubdomainFromHeaders();

    // 2. Get store id by subdomain
    const response = await getStoreIdBySubdomain(store_subdomain);
    const store_id = response.data;

    if (!store_id) {
      return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
    }

    // 3. Get active store categories from cache or database
    const getCategories = unstable_cache(
      async () =>
        await db
          .select({
            name: categoriesTable.name,
            slug: categoriesTable.slug,
            thumbnail: categoriesTable.thumbnail,
          })
          .from(categoriesTable)
          .where(and(eq(categoriesTable.store_id, store_id), eq(categoriesTable.status, ENUM_CATEGORY_STATUS.ACTIVE)))
          .orderBy(desc(categoriesTable.created_at)),

      // Cache key unique identifier for the store
      [`active-store-categories-${store_subdomain}`],
      // Cache tags for invalidation
      { tags: [`active-store-categories-${store_subdomain}`], revalidate: CACHE_REVALIDATION_TIME }
    );

    // 4. Get categories
    const categories = await getCategories();

    // 5. Return categories
    return { data: categories, status: 200, msg: "Categories fetched successfully", error: null };
  } catch (error: unknown) {
    console.error("Error fetching categories:", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
