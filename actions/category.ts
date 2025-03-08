"use server";
import { eq, desc, and } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { categoriesTable } from "@/lib/db/schema";
import { ActionResponse } from ".";
import { ICategoryPreview } from "@/interfaces/category";
import { ENUM_CATEGORY_STATUS } from "@/enums";
import { handleDbError } from "@/utils/db-error";
import { unstable_cache } from "next/cache";
import { getStoreIdFromSubdomain } from "./index";
import { CACHE_REVALIDATION_TIME } from "./constant";

// ✅
export async function getActiveStoreCategoriesWithPreviewData(): Promise<ActionResponse<ICategoryPreview[]>> {
  // 1. Get store id from subdomain
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
  }

  try {
    // 2. Get active store categories from cache or database
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
      [`active-store-categories-${store_id}`],
      // Cache tags for invalidation
      { tags: [`active-store-categories-${store_id}`], revalidate: CACHE_REVALIDATION_TIME }
    );

    // 3. Get categories
    const categories = await getCategories();

    // 4. Return categories
    return { data: categories, status: 200, msg: "Categories fetched successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error fetching categories for store ${store_id} : Error: ${error}`);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
