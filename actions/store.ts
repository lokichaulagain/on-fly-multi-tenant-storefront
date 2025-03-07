"use server";
import { eq, or } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { Stores, storesTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { ActionResponse } from ".";
import { headers } from "next/headers";
import { ActiveDomainInfo, IStoreMetadata } from "@/interfaces/store";
import { unstable_cache } from "next/cache";

// Cache configuration
const CACHE_REVALIDATION_TIME = 60 * 60 * 24; // 24 hours

/*
  Get active store metadata action with cache
  1. Get store subdomain from headers
  2. Get store metadata from cache or database
  3. Return store metadata
*/
export async function getActiveStoreMetadata(): Promise<ActionResponse<IStoreMetadata>> {
  try {
    // 1. Get store subdomain from headers
    const store_subdomain = await getStoreSubdomainFromHeaders();

    // 2. Get store metadata from store table
    const getStoreMetadata = unstable_cache(
      async () => {
        const [store] = await db
          .select({
            id: storesTable.id,
            store_name: storesTable.store_name,
            store_subdomain: storesTable.store_subdomain,
            custom_domain: storesTable.custom_domain,
            store_logo: storesTable.store_logo,
            store_meta_title: storesTable.store_meta_title,
            store_meta_description: storesTable.store_meta_description,
            store_meta_image: storesTable.store_meta_image,
            store_description: storesTable.store_description,
          })
          .from(storesTable)
          .where(eq(storesTable.store_subdomain, store_subdomain))
          .limit(1);

        return store;
      },
      // Cache key unique identifier for the store
      [`active-store-metadata-${store_subdomain}`],
      {
        // Cache tags for invalidation
        tags: [`active-store-metadata-${store_subdomain}`],
        // Cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    // 3. Get store metadata
    const store = await getStoreMetadata();

    // 4. Check if store exists
    if (!store) {
      return { data: null, error: "Store not found", status: 404 };
    }

    // 5. Return the store metadata
    return {
      data: store,
      status: 200,
      msg: "Store metadata fetched successfully",
      error: null,
    };
  } catch (error) {
    console.log("Error fetching store metadata :", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}



export async function getActiveStore(): Promise<ActionResponse<Stores>> {
  try {
    // 1. Get store subdomain from headers
    const store_subdomain = await getStoreSubdomainFromHeaders();

    // 2. Get store metadata from store table
    const getStoreMetadata = unstable_cache(
      async () => {
        const [store] = await db
          .select()
          .from(storesTable)
          .where(eq(storesTable.store_subdomain, store_subdomain))
          .limit(1);

        return store;
      },
      // Cache key unique identifier for the store
      [`active-store-${store_subdomain}`],
      {
        // Cache tags for invalidation
        tags: [`active-store-${store_subdomain}`],
        // Cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    // 3. Get store metadata
    const store = await getStoreMetadata();

    // 4. Check if store exists
    if (!store) {
      return { data: null, error: "Store not found", status: 404 };
    }

    // 5. Return the store metadata
    return {
      data: store,
      status: 200,
      msg: "Store metadata fetched successfully",
      error: null,
    };
  } catch (error) {
    console.log("Error fetching store metadata :", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

/*
  Get active store appearance action with cache
  1. Get store subdomain from headers
  2. Get store appearance from cache or database
  3. Return store appearance
*/
export async function getActiveStoreAppearance(): Promise<ActionResponse<StoreAppearance | unknown>> {
  try {
    // 1. Get store subdomain from headers
    const store_subdomain = await getStoreSubdomainFromHeaders();

    // 2. Get store appearance from cache or database
    const getStoreAppearance = unstable_cache(
      async () => {
        const [store] = await db
          .select({
            store_appearance: storesTable.store_appearance,
          })
          .from(storesTable)
          .where(eq(storesTable.store_subdomain, store_subdomain))
          .limit(1);

        return store;
      },
      // Cache key unique identifier for the store
      [`active-store-appearance-${store_subdomain}`],
      {
        // Cache tags for invalidation
        tags: [`active-store-appearance-${store_subdomain}`],
        // Cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    // 3. Get store appearance
    const store = await getStoreAppearance();

    // 4. Check if store appearance exists
    if (!store) {
      return { data: null, error: "Store appearance not found", status: 404 };
    }

    // 5. Return store appearance
    return { data: store.store_appearance, status: 200, msg: "Store appearance fetched successfully", error: null };
  } catch (error) {
    console.log("Error fetching store appearance :", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}



/*
  Get store ID by store_subdomain action with cache
  1. Get store ID by store_subdomain from cache or database
*/
export async function getStoreIdBySubdomain(store_subdomain: string): Promise<ActionResponse<string>> {
  try {
    // 1. Get store ID by store_subdomain from cache or database
    const getStoreId = unstable_cache(
      async () => {
        const [store] = await db
          .select({
            id: storesTable.id,
          })
          .from(storesTable)
          .where(eq(storesTable.store_subdomain, store_subdomain))
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

    // 2. Get store ID
    const store = await getStoreId();

    // 3. Check if store exists
    if (!store) {
      return { data: null, error: "Store not found", status: 404 };
    }

    // 4. Return store ID
    return { data: store.id, status: 200, msg: "Store ID fetched successfully", error: null };
  } catch (error: unknown) {
    console.log("Error fetching store ID by store_subdomain :", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

/*
  Get active domain info action with cache
  1. Get subdomain from headers
  2. Get domain info by subdomain from cache or database
  3. Return domain info
*/

export async function getActiveDomainInfo(): Promise<ActionResponse<ActiveDomainInfo>> {
  try {
    // 1. Get store subdomain from headers
    const store_subdomain = await getStoreSubdomainFromHeaders();

    // 2. Get domain info by subdomain from cache or database
    const getDomainInfo = unstable_cache(
      async () => {
        const [store] = await db
          .select({
            id: storesTable.id,
            store_name: storesTable.store_name,
            store_subdomain: storesTable.store_subdomain,
            custom_domain: storesTable.custom_domain,
          })
          .from(storesTable)
          .where(eq(storesTable.store_subdomain, store_subdomain));

        return store;
      },
      // Cache key unique identifier for the store
      [`active-domain-info-${store_subdomain}`],
      {
        // Cache tags for invalidation
        tags: [`active-domain-info-${store_subdomain}`],
        // Cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    // 3. Get domain info
    const store = await getDomainInfo();

    // 4. Check if store exists
    if (!store) {
      return { data: null, error: "Store not found", status: 404 };
    }

    // 5. Return domain info
    return { data: store, status: 200, msg: "Active domain info fetched successfully", error: null };
  } catch (error) {
    console.log("Error fetching active domain info :", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

/*
  Check store exists action with cache
  1. Get store subdomain from headers
  2. Check store exists by subdomain or custom domain from cache or database
  3. Return true if store exists, false otherwise
*/
export const checkStoreExists = async (): Promise<ActionResponse<boolean>> => {
  try {
    // 1. Get store subdomain from headers
    const store_subdomain = await getStoreSubdomainFromHeaders();

    // 2. Check store exists by subdomain or custom domain from cache or database
    const checkStoreExists = unstable_cache(
      async () => {
        const [store] = await db.select({ id: storesTable.id }).from(storesTable).where(eq(storesTable.store_subdomain, store_subdomain)).limit(1);

        return store;
      },
      // Cache key unique identifier for the store
      [`check-store-exists-${store_subdomain}`],

      {
        // Cache tags for invalidation
        tags: [`check-store-exists-${store_subdomain}`],
        // Cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    // 3. Get store exists
    const storeExists = await checkStoreExists();

    // 4. Check if store exists
    if (!storeExists) {
      return { data: false, error: "Store not found", status: 404 };
    }

    // 5. Return true if store exists, false otherwise
    return { data: true, status: 200, msg: "Store exists", error: null };
  } catch (error) {
    console.error("Error checking store existence:", error);
    return { data: false, status: 500, error: handleDbError(error) };
  }
};

/*
  Get store subdomain from headers
  1. Get host from headers
  2. Return store subdomain
*/
export async function getStoreSubdomainFromHeaders(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  return host.split(".")[0];
}




