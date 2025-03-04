"use server";
import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { productsTable, storesTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { ActionResponse } from ".";
import { IProductPreview } from "@/interfaces/product";
import { headers } from "next/headers";
import { ENUM_PRODUCT_STATUS } from "@/enums";
/*
  Get Active store products action with preview data
  1. Get active store products with preview data , which status is active and sort by created_at desc
*/
export async function getActiveStoreProductsWithPreviewData(): Promise<ActionResponse<IProductPreview[]>> {
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

    // 2. Get active store products with preview data sort by created_at desc
    const products = await db
      .select({
        id: productsTable.id,
        name: productsTable.name,
        slug: productsTable.slug,
        selling_price: productsTable.selling_price,
        crossed_price: productsTable.crossed_price,
        image_url: sql<string>`${productsTable.image_urls}->0`,
        store_id: productsTable.store_id,
        status: productsTable.status,
        created_at: productsTable.created_at,
      })
      .from(productsTable)
      .where(and(eq(productsTable.store_id, store.id), eq(productsTable.status, ENUM_PRODUCT_STATUS.ACTIVE))) 
      .orderBy(desc(productsTable.created_at));

    // 2. Return products
    console.log(products, "productshere");
    return { data: products, status: 200, msg: "Products fetched successfully", error: null };
  } catch (error: unknown) {
    console.error("Error fetching active store products:", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

export async function getProductBySlug(slug: string): Promise<ActionResponse<any>> {
  try {
    const products = await db.select().from(productsTable).where(eq(productsTable.slug, slug));
    return { data: products[0], status: 200, msg: "Product fetched successfully", error: null };
  } catch (error: unknown) {
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
