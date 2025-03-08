"use server";
import { db } from "@/lib/db/drizzle";
import { Pages, pagesTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { and, desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { ActionResponse, getStoreIdFromSubdomain } from "@/actions/index";
import { IActiveStorePagesWithPreviewData } from "@/interfaces/page";
import { CACHE_REVALIDATION_TIME } from "./constant";

//✅
export async function getActiveStorePagesWithPreviewData(): Promise<ActionResponse<IActiveStorePagesWithPreviewData[]>> {
  // 1. Get store_id from subdomain
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
  }

  try {
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
        // cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    // 3. Get the pages from the cache or database
    const pages = await getCachedPages();

    // 4. Return the pages
    return {
      data: pages,
      status: 200,
      msg: "Active store pages fetched successfully",
      error: null,
    };
  } catch (error: unknown) {
    console.error(`Error fetching active store pages for store ${store_id} : Error: ${error}`);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

//✅ TODO:Update by slug not id in dashboard
export async function getActiveStorePage(slug: string): Promise<ActionResponse<Pages>> {
  // 1. Get store_id from subdomain
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
  }
  try {
    // 2. Get the page from the cache or database
    const getCachedPage = unstable_cache(
      async () => {
        return await db
          .select()
          .from(pagesTable)
          .where(and(eq(pagesTable.slug, slug), eq(pagesTable.store_id, store_id)))
          .limit(1);
      },
      // cache key ,
      [`active-store-page-${slug}`],

      {
        // cache tag for invalidation
        tags: [`active-store-page-${slug}`],
        // cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    // 3. Get the page from the cache or database
    const [page] = await getCachedPage();

    // 4. If page not found return an error or return the page
    if (!page) {
      return { data: null, status: 404, error: "Page not found" };
    }

    // 5. Return the page
    return { data: page, status: 200, msg: "Page fetched successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error fetching page ${slug} for store ${store_id} : Error: ${error}`);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
