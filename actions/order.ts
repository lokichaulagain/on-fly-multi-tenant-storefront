"use server";
import { db } from "@/lib/db/drizzle";
import { Orders, ordersTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { ActionResponse, getStoreIdFromSubdomain } from "@/actions/index";
import { IOrderCreate } from "@/interfaces/order";
import { createOrderNumber } from "@/lib/create-order-number";

// ✅
export async function createOrder(order: IOrderCreate): Promise<ActionResponse<Orders>> {
  // 1. Get store_id from subdomain
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, error: "Store not found " };
  }

  // 2. Only authenticated users can create orders
  const { userId } = await auth();
  if (!userId) {
    return { data: null, status: 401, error: "Please sign in before creating an order" };
  }

  try {
    // 3. Create a random order number
    const order_number = createOrderNumber();

    // 4. Create a new order in the database
    const [newOrder] = await db
      .insert(ordersTable)
      .values({
        ...order,
        order_number: order_number,
        user_id: userId,
        store_id: store_id,
      })
      .returning();

    // 5. Revalidate the checkout page
    revalidatePath("/checkout");
    revalidatePath("/profile");

    // 6. Return the new order
    return { data: newOrder, status: 200, msg: "Order created successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error creating order by user_id: ${userId} for store_id: ${store_id}`, error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
