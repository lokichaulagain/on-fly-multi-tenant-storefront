"use server";
import { eq, desc, and } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { categoriesTable, storesTable } from "@/lib/db/schema";
import { ActionResponse } from ".";
import { ICategoryPreview } from "@/interfaces/category";
import { ENUM_CATEGORY_STATUS } from "@/enums";
import { handleDbError } from "@/utils/db-error";
import { headers } from "next/headers";
/*
  Get Active store categories with preview data 
  1. Get active store categories with preview data , which status is active and sort by created_at desc
*/
export async function getActiveStoreCategoriesWithPreviewData(): Promise<ActionResponse<ICategoryPreview[]>> {
  try {
    // 1. Get subdomain from headers
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const store_subdomain = host.split(".")[0];

    // 2. Get store id by subdomain

    const [store] = await db
      .select({
        id: storesTable.id,
      })
      .from(storesTable)
      .where(eq(storesTable.store_subdomain, store_subdomain))
      .limit(1);

    if (!store) {
      return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
    }

    // 2. Get active store categories with preview data
    const categories = await db
      .select({
        id: categoriesTable.id,
        name: categoriesTable.name,
        slug: categoriesTable.slug,
        thumbnail: categoriesTable.thumbnail,
        status: categoriesTable.status,
        created_at: categoriesTable.created_at,
      })
      .from(categoriesTable)
      .where(and(eq(categoriesTable.store_id, store.id), eq(categoriesTable.status, ENUM_CATEGORY_STATUS.ACTIVE)))
      .orderBy(desc(categoriesTable.created_at));

    // 2. Return categories
    return { data: categories, status: 200, msg: "Categories fetched successfully", error: null };
  } catch (error: unknown) {
    console.log("Error fetching categories:", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
