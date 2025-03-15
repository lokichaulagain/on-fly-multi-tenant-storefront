"use server";
import { db } from "@/lib/db/drizzle";
import { Pages, pagesTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { and, desc, eq, isNull } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { ActionResponse, getStoreIdFromSubdomain } from "@/actions/index";
import { IPageSitemap } from "@/interfaces/page";
import { CACHE_REVALIDATION_TIME } from "./constant";

export async function getPagesForSitemap(): Promise<ActionResponse<IPageSitemap[]>> {
  // 1. Get store_id
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, error: "Store not found" };
  }

  try {
    // 2. Get pages
    const pages = await db
      .select({
        slug: pagesTable.slug,
        updated_at: pagesTable.updated_at,
      })
      .from(pagesTable)
      .where(and(eq(pagesTable.store_id, store_id), isNull(pagesTable.deleted_at)))
      .orderBy(desc(pagesTable.created_at));

    // 3. Return pages
    return { data: pages, status: 200, msg: "Pages fetched successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error fetching pages for sitemap for store ${store_id} : Error: ${error}`);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

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
