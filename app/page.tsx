"use server";
import { cache } from "react";
import { categoriesFetch } from "@/actions/category";


export default async function Page() {
  const getCategories = cache(() => categoriesFetch(["id", "name", "is_active", "order", "created_at"]));

  const { data, error } = await getCategories();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <ul className="space-y-2">
        {data?.map((category: any) => (
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
