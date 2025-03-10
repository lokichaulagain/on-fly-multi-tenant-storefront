"use server";
import { db } from "@/lib/db/drizzle";
import { WishList, wishListTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { ActionResponse, getStoreIdFromSubdomain } from "@/actions/index";
import { unstable_cache } from "next/cache";
import { CACHE_REVALIDATION_TIME } from "./constant";

// ✅
export async function createWishList(product_id: string): Promise<ActionResponse<WishList>> {
  // 1. Ensure the user is authenticated and has an organization
  const { userId } = await auth();
  if (!userId) {
    return { data: null, status: 401, error: "Oops! You need to be logged in to add to wishlist" };
  }

  try {
    // 2. Check if the product is already in the wishlist
    const [existingWishList] = await db
      .select()
      .from(wishListTable)
      .where(and(eq(wishListTable.product_id, product_id), eq(wishListTable.user_id, userId)));

      console.log(existingWishList,"existingWishList")
    if (existingWishList) {
      return { data: null, status: 400, error: "Oops! Product is already in wishlist" };
    }



    // 3. Get the store id from the subdomain
    const response = await getStoreIdFromSubdomain();
    const store_id = response.data;
    if (!store_id) {
      return { data: null, status: 404, error: "Store not found " };
    }

    // 4. Insert the new wishlist into the database
    const [newWishList] = await db
      .insert(wishListTable)
      .values({
        product_id,
        user_id: userId,
        store_id: store_id,
      })
      .returning();

    // 5. Revalidate the cache for the wishlist
    revalidateTag(`active-user-wishlists-${userId}`);
    revalidateTag(`active-user-wishlist-${userId}`)  

    // 7. Return the new wishlist
    return { data: newWishList, status: 201, msg: "Product added to wishlists successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error creating wishlists by userId: ${userId}`, error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

// ✅
export async function getActiveUserWishLists(): Promise<ActionResponse<WishList[]>> {
  // 1. Ensure the user is authenticated and has an organization
  const { userId } = await auth();
  if (!userId) {
    return { data: null, status: 401, error: "Oops! You need to be logged in to get your wishlist" };
  }

  try {
    // 1. Get the store id from the subdomain
    const response = await getStoreIdFromSubdomain();
    const store_id = response.data;
    if (!store_id) {
      return { data: null, status: 404, error: "Store not found " };
    }

    // 2. Get the wishlists from the cache or database
    const getCachedWishLists = unstable_cache(
      async () => {
        return await db
          .select()
          .from(wishListTable)
          .where(and(eq(wishListTable.user_id, userId), eq(wishListTable.store_id, store_id)))
          .orderBy(desc(wishListTable.created_at));
      },
      // cache key ,
      [`active-user-wishlist-${userId}`],

      {
        // cache tag for invalidation
        tags: [`active-user-wishlist-${userId}`],
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    const wishLists = await getCachedWishLists();
    return {
      data: wishLists,
      status: 200,
      msg: "Wishlists fetched successfully",
      error: null,
    };
  } catch (error: unknown) {
    console.error(`Error fetching wishlists by userId: ${userId}`, error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

// ✅
export async function getActiveUserWishList(product_id: string): Promise<ActionResponse<WishList>> {
  // 1. Ensure the user is authenticated and has an organization
  const { userId } = await auth();
  if (!userId) {
    return { data: null, status: 401, error: "Oops! You need to be logged in to get your wishlist" };
  }

  try {
    // 1. Get the store id from the subdomain
    const response = await getStoreIdFromSubdomain();
    const store_id = response.data;
    if (!store_id) {
      return { data: null, status: 404, error: "Store not found " };
    }

    // 2. Get the wishlist from the cache or database
    const getCachedWishList = unstable_cache(
      async () => {
        return await db
          .select()
          .from(wishListTable)
          .where(and(eq(wishListTable.user_id, userId), eq(wishListTable.product_id, product_id), eq(wishListTable.store_id, store_id)));
      },
      // cache key ,
      [`active-user-wishlist-${userId}`],

      {
        // cache tag for invalidation
        tags: [`active-user-wishlist-${userId}`],
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    const [wishList] = await getCachedWishList();
    console.log(wishList,"wishList")

    // 4. Return the wishlist
    return { data: wishList, status: 200, msg: "Wishlist fetched successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error fetching wishlist by product_id: ${product_id}`, error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

// ✅
export async function removeActiveUserWishList(id: string): Promise<ActionResponse<WishList>> {
  // 1. Ensure the user is authenticated and has an organization
  const { userId } = await auth();
  if (!userId) {
    return { data: null, status: 401, error: "Oops! You are not authorized to remove the wishlist" };
  }

  try {
    // 1. Get the store id from the subdomain
    const response = await getStoreIdFromSubdomain();
    const store_id = response.data;
    if (!store_id) {
      return { data: null, status: 404, error: "Store not found " };
    }

    // 2. Delete the wishlist from the database and return the deleted wishlist
    const [deletedWishList] = await db
      .delete(wishListTable)
      .where(and(eq(wishListTable.id, id), eq(wishListTable.store_id, store_id), eq(wishListTable.user_id, userId)))
      .returning();

    // 3. If wishlist not found return an error
    if (!deletedWishList) {
      return { data: null, status: 404, error: "Oops! Wishlist not found or you are not authorized to delete it" };
    }

    // 4. Revalidate the wishlists
    revalidateTag(`active-user-wishlists-${userId}`);
    revalidateTag(`active-user-wishlist-${userId}`); 

    // 5. Return the deleted wishlist
    return { data: deletedWishList, status: 200, msg: "Wishlist removed successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error removing wishlist by id: ${id}`, error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}
