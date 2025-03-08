"use server";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { ordersTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { ActionResponse, getStoreIdFromSubdomain } from ".";
import { currentUser } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";
import { CACHE_REVALIDATION_TIME } from "./constant";

// ✅
export async function getActiveUserOrders(): Promise<ActionResponse<any[]>> {
  // 1. Get store_id from subdomain
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
  }

  // 2. Get user_id from clerk
  const user = await currentUser();
  if (!user) {
    return { data: null, status: 404, msg: "User not found", error: "User not found" };
  }

  try {
    // 3. Get orders from database from cache or database
    const getOrders = unstable_cache(
      async () => {
        const orders = await db.query.ordersTable.findMany({
          where: and(eq(ordersTable.store_id, store_id), eq(ordersTable.user_id, user.id)),
        });
        return orders;
      },

      //  Cache key
      ["active-user-orders", store_id, user.id],

      {
        // Cache tags for invalidation
        tags: [`active-user-orders-${user.id}`],

        // Cache revalidation time
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    // 4. Return the orders
    const orders = await getOrders();

    // 5. Return the orders
    return { data: orders, status: 200, msg: "Orders fetched successfully", error: null };
  } catch (error) {
    console.error(`Error fetching orders for user_id: ${user.id} for store_id: ${store_id}`, error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
