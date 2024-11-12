"use server";
import { cache } from "react";
import { categoriesFetch } from "@/actions/category";


// Define types for your category and response
interface Category {
  id: string;
  name: string;
  is_active: boolean;
  order: number;
  created_at: string;
}

interface ApiResponse {
  data: Category[] | null;
  error: string | null;
  status: number | null;
}

// Type the categoriesFetch function

export default async function Page() {
  const getCategories = cache(() => categoriesFetch(["id", "name", "is_active", "order", "created_at"]) as Promise<ApiResponse>);

  const { data: categories, error: categoriesFetchError } = await getCategories();

  console.log(categories);
  console.log(categoriesFetchError, "categoriesFetchError");

  if (categoriesFetchError) {
    return <div className="p-4 text-red-500">Error: {categoriesFetchError}</div>;
  }

  if (!categories || categories.length === 0) {
    return <div className="p-4 text-gray-500">No categories found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <ul className="space-y-2">
        {categories.map((category:Category) => (
          <li
            key={category.id}
            className="p-2 bg-gray-50 rounded-md">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
