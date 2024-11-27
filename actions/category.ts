"use server";
import { createClient } from "@/utils/supabase/server";

const orgId = process.env.NEXT_TENANT_ID;

export const categoryFetch = async (id: number) => {
  const supabase = await createClient();

  const { data, status, error } = await supabase.from("Category").select("*").eq("id", id).eq("tenant", orgId).single();
  return { data, status, error };
};

export const categoriesFetch = async (tenant:string, fields: string[]) => {
  const supabase = await createClient();

  const { data, status, error } = await supabase.from("Category").select(fields.join(",")).eq("tenant", tenant).order("created_at", { ascending: false });
  return { data, status, error };
};

// export const tenantFetch = async (subdomain:string,fields: string[]) => {
//   const supabase = await createClient();

//   if (!orgId) {
//     return {
//       data: null,
//       status: 403,
//       error: { message: "You are not authorized." },
//     };
//   }

//   const { data, status, error } = await supabase.from("Tenant").select(fields.join(",")).eq("subdomain", subdomain).single();
//   return { data, status, error };
// };

export const tenantFetch = async (subdomain: string, fields: string[]) => {
  const supabase = await createClient();

  // Assuming you meant to check subdomain, remove or replace `orgId` with `subdomain`
  if (!subdomain) {
    return {
      data: null,
      status: 403,
      error: { message: "You are not authorized." },
    };
  }

  const { data, status, error } = await supabase
    .from("Tenant")
    .select(fields.join(",") as "*")
    .eq("sub_domain", subdomain)
    .single();

  return { data, status, error };
};
