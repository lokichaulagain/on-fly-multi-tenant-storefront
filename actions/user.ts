"use server";
import { and, eq, or } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { Orders, ordersTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { ActionResponse } from ".";
import { headers } from "next/headers";
import { ActiveDomainInfo, IStoreAppearance, IStoreMetadata } from "@/interfaces/store";
import { unstable_cache } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { getStoreIdBySubdomain, getStoreSubdomainFromHeaders } from "./store";

// export async function getActiveUserOrders() {

// }

export async function getActiveUserOrders(): Promise<ActionResponse<any[]>> {
  try {
    // 1. Get subdomain from headers
    const store_subdomain = await getStoreSubdomainFromHeaders();

    // 2. Get store id by subdomain
    const response = await getStoreIdBySubdomain(store_subdomain);
    const store_id = response.data;

    if (!store_id) {
      return { data: null, status: 404, msg: "Store not found", error: "Store not found" };
    }

    const user = await currentUser();

    if (!user) {
      return { data: null, status: 404, msg: "User not found", error: "User not found" };
    }

    // 
    const orders = await db.query.ordersTable.findMany({
      where: and(eq(ordersTable.store_id, store_id), eq(ordersTable.user_id, user.id)),
    });

    return { data: orders, status: 200, msg: "Orders fetched successfully", error: null };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
