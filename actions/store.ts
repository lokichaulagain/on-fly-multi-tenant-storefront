"use server";
import { revalidatePath } from "next/cache";
// import { ssss } from "@clerk/express";
import { auth, Organization } from "@clerk/nextjs/server";
// import { StoreFormValues } from "@/form-schemas/store";
// import { handleDbError } from "@/utils/db-error";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { Categories, categoriesTable, Stores, storesTable } from "@/lib/db/schema";
import { handleDbError } from "@/utils/db-error";
import { ActionResponse } from ".";


export async function getStoreBySubdomain(subdomain:string): Promise<ActionResponse<Stores>> {
    try {
    //   // Ensure the user is authenticated and has an organization
    //   const { orgId, userId } = await auth();
    //   if (!orgId || !userId) {
    //     return { data: null, status: 401, error: "You are not authorized" };
    //   }
  
      const [store] = await db.select().from(storesTable).where(eq(storesTable.store_subdomain, subdomain));
      if (!store) {
        return { data: null, error: "Store not found" };
      }
  
      return { data: store, status: 200, msg: "Store fetched successfully", error: null };
    } catch (error: unknown) {
      console.log("Error fetching store:", error);
      return { data: null, status: 500, error: handleDbError(error) };
    }
  }


  export async function getCategoriesBySubdomain(subdomain: string): Promise<ActionResponse<Categories[]>> {
    try {
      const [store] = await db.select().from(storesTable).where(eq(storesTable.store_subdomain, subdomain));
      if (!store) {
        return { data: null, error: "Store not found", status: 404 };
      }
  
      // Remove array destructuring to fetch all categories
      const categories = await db.select().from(categoriesTable).where(eq(categoriesTable.store_id, store.id));
      
      if (!categories.length) {
        return { data: null, error: "Categories not found", status: 404 };
      }
  
      return { data: categories, status: 200, msg: "Categories fetched successfully", error: null };
  
    } catch (error: unknown) {
      console.log("Error fetching store:", error);
      return { data: null, status: 500, error: handleDbError(error) };
    }
  }
  