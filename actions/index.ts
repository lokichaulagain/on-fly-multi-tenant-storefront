"use server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { unstable_cache } from "next/cache";
import { headers } from "next/headers";
import { storesTable } from "@/lib/db/schema";
import { CACHE_REVALIDATION_TIME } from "./constant";
import { handleDbError } from "@/utils/db-error";

export type ActionResponse<T> = {
  data: T | null;
  msg?: string;
  error: string | null;
  status?: number;
};

// ✅
export async function getStoreIdFromSubdomain(): Promise<ActionResponse<string>> {
  //1. Get the subdomain from headers
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const store_subdomain = host.split(".")[0];

  try {
    //2. Use unstable_cache to fetch store ID by subdomain
    const getStoreId = unstable_cache(
      async (subdomain: string) => {
        const [store] = await db
          .select({
            id: storesTable.id,
          })
          .from(storesTable)
          .where(eq(storesTable.store_subdomain, subdomain))
          .limit(1);
        return store;
      },
      // Cache key unique identifier for the store
      [`store-id-${store_subdomain}`],
      {
        // Cache tags for invalidation
        tags: [`store-id-${store_subdomain}`],
        // Cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    //3. Get store ID from cache or database
    const store = await getStoreId(store_subdomain);

    //4. Check if store exists
    if (!store) {
      return { data: null, error: "Store not found", status: 404 };
    }

    //5. Return store ID
    return { data: store.id, status: 200, msg: "Store ID fetched successfully", error: null };
  } catch (error: unknown) {
    console.log(`Error fetching store ID from subdomain ${store_subdomain} : Error: ${error} `);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
