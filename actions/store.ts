"use server";
import { eq, or } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { Stores, storesTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { ActionResponse } from ".";
import { headers } from "next/headers";
import { ActiveDomainInfo, StoreMetadata } from "@/interfaces/store";
import { Metadata } from "next";

/*
  Get store by subdomain action
  1. Get store by subdomain
*/
export async function getStoreBySubdomain(subdomain: string): Promise<ActionResponse<Stores>> {
  try {
    // 1. Get store by subdomain
    const [store] = await db.select().from(storesTable).where(eq(storesTable.store_subdomain, subdomain));
    if (!store) {
      return { data: null, error: "Store not found", status: 404 };
    }

    // 2. Return store
    return { data: store, status: 200, msg: "Store fetched successfully", error: null };
  } catch (error: unknown) {
    console.log("Error fetching store by subdomain :", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

/*
  Get store metadata action
  1. Get store metadata
*/

export async function getActiveStoreMetadata(store_subdomain: string): Promise<ActionResponse<StoreMetadata>> {
  try {
    // 2. Get store metadata from store table
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
      })
      .from(storesTable)
      .where(eq(storesTable.store_subdomain, store_subdomain))
      .limit(1);

    // 3. Check if store exists
    if (store) {
      return { data: null, error: "Store not found", status: 404 };
    }

    // 4. Return the store metadata
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
  Get store ID by store_subdomain action
  1. Get store ID by store_subdomain
*/
export async function getStoreIdBySubdomain(store_subdomain: string): Promise<ActionResponse<string>> {
  try {
    const [store] = await db
      .select({
        id: storesTable.id,
      })
      .from(storesTable)
      .where(eq(storesTable.store_subdomain, store_subdomain));

    if (!store) {
      return { data: null, error: "Store not found", status: 404 };
    }

    return { data: store.id, status: 200, msg: "Store ID fetched successfully", error: null };
  } catch (error: unknown) {
    console.log("Error fetching store ID by store_subdomain :", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

/*
  Get active domain info action
  1. Get subdomain from headers
  2. Get domain info by subdomain from store table
  3. Return domain info
*/

export async function getActiveDomainInfo(): Promise<ActionResponse<ActiveDomainInfo>> {
  try {
    // 1. Get subdomain from headers
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const store_subdomain = host.split(".")[0];

    // 2. Get domain info by subdomain from store table
    const [store] = await db
      .select({
        id: storesTable.id,
        store_name: storesTable.store_name,
        store_subdomain: storesTable.store_subdomain,
        custom_domain: storesTable.custom_domain,
      })
      .from(storesTable)
      .where(eq(storesTable.store_subdomain, store_subdomain));

    // 3. Return domain info
    if (!store) {
      return { data: null, error: "Store not found", status: 404 };
    }

    // 4. Return domain info
    return { data: store, status: 200, msg: "Active domain info fetched successfully", error: null };
  } catch (error) {
    console.log("Error fetching active domain info :", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

/*
  Check store exists action
  1. Check store exists by subdomain or custom domain
  2. Return true if store exists, false otherwise
*/
export const checkStoreExists = async (): Promise<ActionResponse<boolean>> => {
  try {
    // 1. Get subdomain from headers
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const storeSubdomain = host.split(".")[0];

    // 2. Check store exists by subdomain or custom domain
    const storeExists = await db
      .select({ id: storesTable.id })
      .from(storesTable)
      .where(or(eq(storesTable.store_subdomain, storeSubdomain), eq(storesTable.custom_domain, host)))
      .limit(1)
      .then((result) => result.length > 0);

    // 3. Return response based on store existence
    if (!storeExists) {
      return { data: false, error: "Store not found", status: 404 };
    }

    return { data: true, status: 200, msg: "Store exists", error: null };
  } catch (error) {
    console.error("Error checking store existence:", error);
    return { data: false, status: 500, error: handleDbError(error) };
  }
};
