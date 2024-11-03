"use server";
import { categoriesFetch } from "@/actions/category";
import React, { cache } from "react";

export default async function Home() {
  const getCategories = cache(() => categoriesFetch(["id", "name", "is_active", "order", "created_at"]));
  const { data: categories, error: categoriesFetchError } = await getCategories();
  console.log(categories);
  console.log(categoriesFetchError,"categoriesFetchError");

  if (categoriesFetchError) {
    return <div>Error</div>;
  }

  return <div>Home</div>;
}
