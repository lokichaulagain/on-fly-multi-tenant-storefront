"use server";
import { db } from "@/lib/db/drizzle";
import { Pages, pagesTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { and, desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { ActionResponse } from "@/actions/index";
import { getStoreIdBySubdomain, getStoreSubdomainFromHeaders } from "./store";

// Cache configuration
const CACHE_REVALIDATION_TIME = 60 * 60 * 24; // 24 hours

export interface IActiveStorePagesWithPreviewData {
  id: string;
  title: string;
  slug: string;
}

export async function getActiveStorePagesWithPreviewData(): Promise<ActionResponse<IActiveStorePagesWithPreviewData[]>> {
  try {
    // 1. Get subdomain from headers
    const store_subdomain = await getStoreSubdomainFromHeaders();

    // 2. Get store id by subdomain
    const response = await getStoreIdBySubdomain(store_subdomain);
    const store_id = response.data;

    if (!store_id) {
      return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
    }

    // 2. Get the pages from the cache or database
    const getCachedPages = unstable_cache(
      async () => {
        return await db
          .select({
            id: pagesTable.id,
            title: pagesTable.title,
            slug: pagesTable.slug,
          })
          .from(pagesTable)
          .where(and(eq(pagesTable.store_id, store_id)))
          .orderBy(desc(pagesTable.created_at));
      },
      // cache key , unique identifier for the cached data based on the store id
      [`active-store-pages-${store_id}`],

      {
        // cache tag for invalidation
        tags: [`active-store-pages-${store_id}`],
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    const pages = await getCachedPages();
    return {
      data: pages,
      status: 200,
      msg: "Active store pages fetched successfully",
      error: null,
    };
  } catch (error: unknown) {
    console.error("Error fetching active store pages:", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

export async function getActiveStorePage(slug: string): Promise<ActionResponse<Pages>> { 
  try {
    // 1. Get subdomain from headers
    const store_subdomain = await getStoreSubdomainFromHeaders();

    // 2. Get store id by subdomain
    const response = await getStoreIdBySubdomain(store_subdomain);
    const store_id = response.data;

    if (!store_id) {
      return { data: null, status: 404, error: "Store not found" };
    }

    // 2. Get the page from the cache or database
    const getCachedPage = unstable_cache(
      async () => {
        return await db
          .select()
          .from(pagesTable)
          .where(and(eq(pagesTable.slug, slug), eq(pagesTable.store_id, store_id)));
      },
      // cache key , unique identifier for the cached data based on the store id
      [`active-store-page-${slug}`],

      {
        // cache tag for invalidation
        tags: [`active-store-page-${slug}`],
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    const [page] = await getCachedPage();

    // 3. If page not found return an error or return the page
    if (!page) {
      return { data: null, status: 404, error: "Page not found" };
    }

    // 4. Return the page
    return { data: page, status: 200, msg: "Page fetched successfully", error: null };
  } catch (error: unknown) {
    console.error("Error fetching page:", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
