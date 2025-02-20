"use server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { productsTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { ActionResponse } from ".";
import { IProductPreview } from "@/interfaces/product";

export async function getProductsByStoreId(store_id: string): Promise<ActionResponse<IProductPreview[]>> {
  try {
    const products = await db
      .select({
        id: productsTable.id,
        name: productsTable.name,
        slug: productsTable.slug,
        selling_price: productsTable.selling_price,
        image_url: sql`${productsTable.image_urls}->0`,
      })
      .from(productsTable)
      .where(eq(productsTable.store_id, store_id));
    return { data: products, status: 200, msg: "Products fetched successfully", error: null };
  } catch (error: unknown) {
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



