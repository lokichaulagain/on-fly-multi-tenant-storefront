"use server";
import { eq, or } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { Stores, storesTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { ActionResponse, getStoreIdFromSubdomain } from ".";
import { unstable_cache } from "next/cache";
import { CACHE_REVALIDATION_TIME } from "./constant";
import { IStoreAppearance } from "@/interfaces/store";

// ✅
export async function getActiveStore(): Promise<ActionResponse<Stores>> {
  // 1. Get store_id from subdomain
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
  }

  try {
    // 2. Get the store from the cache or database by store_id
    const getCachedStore = unstable_cache(
      async () => {
        return await db.select().from(storesTable).where(eq(storesTable.id, store_id)).limit(1);
      },
      // Cache key ,
      [`active-store-${store_id}`],
      {
        // Cache tag for invalidation
        tags: [`active-store-${store_id}`],
        // Cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    const [store] = await getCachedStore();

    // 3. Check if the store exists
    if (!store) {
      return { data: null, status: 404, error: "Oops! Active store not found or you are not authorized to get it" };
    }

    // 4. Return the store
    return { data: store, status: 200, msg: "Active store fetched successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error fetching active store by store_id: ${store_id}`, error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

// Get active store appearance

export async function getActiveStoreAppearance(): Promise<ActionResponse<IStoreAppearance>> {
  // 1. Get store_id from subdomain
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
  }

  try {
    // 2. Get the appearance from the cache or database by store_id
    const getCachedAppearance = unstable_cache(
      async () => {
        return await db
          .select({
            store_appearance: storesTable.store_appearance,
          })
          .from(storesTable)
          .where(eq(storesTable.id, store_id))
          .limit(1);
      },
      // Cache key ,
      [`active-store-appearance-${store_id}`],
      {
        // Cache tag for invalidation
        tags: [`active-store-appearance-${store_id}`],
        // Cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    const [store] = await getCachedAppearance();

    // 3. Check if the store exists
    if (!store) {
      return { data: null, status: 404, error: "Oops! Active store not found or you are not authorized to get it" };
    }

    // 4. Return the store
    return { data: store.store_appearance, status: 200, msg: "Active store appearance fetched successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error fetching active store by store_id: ${store_id}`, error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
