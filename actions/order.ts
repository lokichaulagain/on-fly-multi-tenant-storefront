"use server";
import { db } from "@/lib/db/drizzle";
import { Orders, ordersTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "@/actions/index";
import { IOrderCreate } from "@/interfaces/order";
import { createOrderNumber } from "@/lib/create-order-number";

export async function createOrder(order: IOrderCreate): Promise<ActionResponse<Orders>> {
  try {
    console.log("order", order);
    // 1. Only authenticated users can create orders
    const { userId } = await auth();
    if (!userId) {
      return { data: null, status: 401, error: "Please sign in before creating an order" };
    }

    // Create a random order number
    const order_number = createOrderNumber();

    // 2. Create a new order
    const [newOrder] = await db
      .insert(ordersTable)
      .values({
        ...order,
        order_number: order_number,
      })
      .returning();

    // 3. Revalidate the checkout page
    revalidatePath("/checkout");

    // 4. Return the new order
    return { data: newOrder, status: 200, msg: "Order created successfully", error: null };
  } catch (error: unknown) {
    // 5. Handle errors
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
