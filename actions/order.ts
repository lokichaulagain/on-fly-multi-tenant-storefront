"use server";
import { db } from "@/lib/db/drizzle";
import { Orders, ordersTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "@/actions/index";
import { IOrderCreate } from "@/interfaces/order";
import { createOrderNumber } from "@/lib/create-order-number";
import { getStoreIdBySubdomain, getStoreSubdomainFromHeaders } from "./store";

// Cache configuration
const CACHE_REVALIDATION_TIME = 60 * 60 * 24; // 24 hours

/*
  Create order action
  1. Only authenticated users can create orders
  2. Create a random order number
  3. Create a new order
  4. Revalidate the checkout page
  5. Return the new order
*/
export async function createOrder(order: IOrderCreate): Promise<ActionResponse<Orders>> {
  try {
    // 1. Only authenticated users can create orders
    const { userId } = await auth();
    if (!userId) {
      return { data: null, status: 401, error: "Please sign in before creating an order" };
    }

    // 2. Get store subdomain from headers
    const store_subdomain = await getStoreSubdomainFromHeaders();

    // 3. Get store id by subdomain
    const response = await getStoreIdBySubdomain(store_subdomain);
    const store_id = response.data;

    if (!store_id) {
      return { data: null, status: 404, error: "Store not found" };
    }

    // 2. Create a random order number
    const order_number = createOrderNumber();

    // 3. Create a new order
    const [newOrder] = await db
      .insert(ordersTable)
      .values({
        ...order,
        order_number: order_number,
        user_id: userId,
        store_id: store_id,
      })
      .returning();

    // 3. Revalidate the checkout page
    revalidatePath("/checkout");

    // 4. Return the new order
    return { data: newOrder, status: 200, msg: "Order created successfully", error: null };
  } catch (error: unknown) {
    console.error("Error creating order:", error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
