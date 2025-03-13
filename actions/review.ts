"use server";
import { db } from "@/lib/db/drizzle";
import { Reviews, reviewsTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { ActionResponse, getStoreIdFromSubdomain } from "@/actions/index";
import { unstable_cache } from "next/cache";
import { CACHE_REVALIDATION_TIME } from "./constant";
import { reviewFormSchema, ReviewFormValues } from "@/form-schemas/review";
import { Mutex } from "async-mutex";
import { rateLimiter } from "@/utils/rate-limiter";
import { sanitizeInput } from "@/utils/sanitize-input";
const reviewMutex = new Mutex();

// ✅
export async function createReview(reviewData: ReviewFormValues): Promise<ActionResponse<Reviews>> {
  // 1. Get userId
  const { userId } = await auth();
  if (!userId) {
    return { data: null, status: 401, error: "Oops! You need to be logged in to review a product" };
  }

  // 2. Get store_id
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, error: "Store not found" };
  }

  // // 3. Rate Limiting: Check if the user has exceeded the review submission limit
  // const rateLimitResponse = await rateLimiter(userId, "createReview");
  // if (rateLimitResponse.limited) {
  //   return { data: null, status: 429, error: "Oops! You have made too many requests. Please try again later." };
  // }

  // 4. Sanitize input data to prevent XSS, SQL injection, etc.
  // const sanitizedReviewData = sanitizeInput(reviewData);
  const sanitizedReviewData = reviewData;

  // 5. Validate the sanitized reviewData
  const validatedReview = reviewFormSchema.safeParse(sanitizedReviewData);
  if (!validatedReview.success) {
    return { data: null, status: 400, error: validatedReview.error.message };
  }

  // 6. Concurrency Control (Mutex to prevent race conditions)
  const release = await reviewMutex.acquire();

  try {
    // 7. Insert the new review into the database
    const [newReview] = await db
      .insert(reviewsTable)
      .values({
        ...validatedReview.data,
        store_id: store_id,
        user_id: userId,
        product_id: validatedReview.data.product_id,
      })
      .returning();

    // 8. Revalidate the cache for the product reviews
    revalidateTag(`active-product-reviews-${validatedReview.data.product_id}`);

    // 9. Release the mutex
    release();

    // 10. Return the new review
    return { data: newReview, status: 201, msg: "Review created successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error creating review for product_id: ${reviewData.product_id}`, error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

// ✅
export async function getActiveProductReviews(product_id: string): Promise<ActionResponse<Reviews[]>> {
  // 2. Get store_id
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, error: "Store not found" };
  }

  // // 3. Rate Limiting: Check if the user has exceeded the request limit
  // const rateLimitResult = await rateLimiter(userId, "getActiveProductReviews");
  // if (rateLimitResult.limited) {
  //   return { data: null, status: 429, error: "Too many requests. Please try again later." };
  // }

  try {
    // 4. Get the reviews from the cache or database
    const getCachedReviews = unstable_cache(
      async () => {
        return await db
          .select()
          .from(reviewsTable)
          .where(and(eq(reviewsTable.product_id, product_id), eq(reviewsTable.store_id, store_id)))
          .orderBy(desc(reviewsTable.created_at));
      },
      // Cache key
      [`active-product-reviews-${product_id}`],
      {
        // Cache tag for invalidation
        tags: [`active-product-reviews-${product_id}`],
        revalidate: CACHE_REVALIDATION_TIME,
      }
    );

    const reviews = await getCachedReviews();
    console.log(reviews, "reviews");
    return {
      data: reviews,
      status: 200,
      msg: "Reviews fetched successfully",
      error: null,
    };
  } catch (error: unknown) {
    console.error(`Error fetching reviews for product_id: ${product_id}`, error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

// ✅
export async function updateActiveProductReview(id: string, reviewData: ReviewFormValues): Promise<ActionResponse<Reviews>> {
  // 1. Get userId
  const { userId } = await auth();
  if (!userId) {
    return { data: null, status: 401, error: "Oops! You need to be logged in to update the review" };
  }

  // 2. Get store_id
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, error: "Store not found" };
  }

  // // 3. Rate Limiting: Check if the user has exceeded the request limit
  // const rateLimitResult = await rateLimiter(userId, "updateActiveProductReview");
  // if (rateLimitResult.limited) {
  //   return { data: null, status: 429, error: "Oops! You have made too many requests. Please try again later." };
  // }

  // 4. Sanitize input data to prevent XSS, SQL injection, etc.
  const sanitizedReviewData = sanitizeInput(reviewData);

  // 5. Validate the review form data
  const validatedReview = reviewFormSchema.safeParse(sanitizedReviewData);
  if (!validatedReview.success) {
    return { data: null, status: 400, error: validatedReview.error.message };
  }

  // 6. Concurrency Control (Mutex to prevent race conditions)
  const release = await reviewMutex.acquire();

  try {
    // 7. Update the review in the database
    const [updatedReview] = await db
      .update(reviewsTable)
      .set({
        ...validatedReview.data,
      })
      .where(and(eq(reviewsTable.id, id), eq(reviewsTable.store_id, store_id), eq(reviewsTable.user_id, userId)))
      .returning();

    if (!updatedReview) {
      return { data: null, status: 404, error: "Oops! Review not found or you are not authorized to update it" };
    }

    // 8. Revalidate the product reviews cache
    revalidateTag(`active-product-reviews-${validatedReview.data.product_id}`);

    // 9. Release the mutex
    release();

    // 10. Return the updated review
    return { data: updatedReview, status: 200, msg: "Review updated successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error updating review for product_id: ${reviewData.product_id}`, error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

// ✅
export async function deleteActiveProductReview(id: string): Promise<ActionResponse<Reviews>> {
  // 1. Get userId
  const { userId } = await auth();
  if (!userId) {
    return { data: null, status: 401, error: "Oops! You need to be logged in to delete a review" };
  }

  // 2. Get store_id
  const response = await getStoreIdFromSubdomain();
  const store_id = response.data;
  if (!store_id) {
    return { data: null, status: 404, error: "Store not found" };
  }

  // // 3. Rate Limiting: Check if the user has exceeded the request limit
  // const rateLimitResult = await rateLimiter(userId, "deleteActiveProductReview");
  // if (rateLimitResult.limited) {
  //   return { data: null, status: 429, error: "Oops! You have made too many requests. Please try again later." };
  // }

  // 4. Concurrency Control (Mutex to prevent race conditions)
  const release = await reviewMutex.acquire();

  try {
    // 5. Delete the review from the database
    const [deletedReview] = await db
      .delete(reviewsTable)
      .where(and(eq(reviewsTable.id, id), eq(reviewsTable.store_id, store_id), eq(reviewsTable.user_id, userId)))
      .returning();

    if (!deletedReview) {
      return { data: null, status: 404, error: "Oops! Review not found or you are not authorized to delete it" };
    }

    // 6. Revalidate the product reviews cache
    revalidateTag(`active-product-reviews-${deletedReview.product_id}`);

    // 7. Release the mutex
    release();

    // 8. Return the deleted review
    return { data: deletedReview, status: 200, msg: "Review deleted successfully", error: null };
  } catch (error: unknown) {
    console.error(`Error deleting review for product_id: ${id}`, error);
    return { data: null, status: 500, error: handleDbError(error) };
  }
}

// Check if the logged in user has reviewed  the particular product
export async function checkIfUserHasReviewedProduct(product_id: string): Promise<ActionResponse<boolean>> {
  const { userId } = await auth();

  // If the user is not logged in, return an error
  if (!userId) {
    return {
      data: false,
      status: 401,
      error: "Oops! You need to be logged in to check if you have reviewed a product",
    };
  }

  try {
    // Directly query the database to check if a review exists for the given product_id and user_id
    const review = await db
      .select()
      .from(reviewsTable)
      .where(and(eq(reviewsTable.product_id, product_id), eq(reviewsTable.user_id, userId)))
      .limit(1);

    // If a review exists, return true; otherwise, return false
    const hasReviewed = review.length > 0;

    return {
      data: hasReviewed,
      status: 200,
      msg: hasReviewed ? "User has reviewed the product" : "User has not reviewed the product",
      error: null,
    };
  } catch (error) {
    console.error(`Error checking if user has reviewed product: ${error}`);
    return {
      data: false,
      status: 500,
      error: "An error occurred while checking if the user has reviewed the product",
    };
  }
}
