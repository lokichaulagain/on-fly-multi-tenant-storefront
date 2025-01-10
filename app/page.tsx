"use server";
import { cache } from "react";
import { categoriesFetch, tenantFetch } from "@/actions/category";
import { headers } from "next/headers";

export default async function Page() {
  // const headersList = await headers();
  // const domain = headersList.get("host");
  // const subdomain = domain?.split(".")[0];

  // if (!subdomain) {
  //   return null;
  // }

  // const getTenantMetaData = cache(() => tenantFetch(subdomain, ["name", "description", "logo", "organization_id"]));
  // const { data: tenantData, status: tenantStatus, error: tenantError } = await getTenantMetaData();
  // console.log(tenantData, "tenantData");

  // if (tenantError || !tenantData) {
  //   return null;
  // }

  // const getCategories = cache(() => categoriesFetch(tenantData?.organization_id, ["id", "name", "is_active", "order", "created_at"]));
  // const { data, error } = await getCategories();

  // get organization

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <ul className="space-y-2">
        {/* {data?.map((category: any) => (
          <li
            key={category.id}
            className="p-2 bg-gray-50 rounded-md">
            {category.name}
          </li>
        ))} */}
      </ul>
    </div>
  );
}
