"use server";
import { createClient } from "@/utils/supabase/server";

const orgId = process.env.NEXT_TENANT_ID;

export const categoryFetch = async (id: number) => {
  const supabase = await createClient();

  const { data, status, error } = await supabase.from("Category").select("*").eq("id", id).eq("tenant", orgId).single();
  return { data, status, error };
};

export const categoriesFetch = async (fields: string[]) => {
  const supabase = await createClient();

  const { data, status, error } = await supabase.from("Category").select(fields.join(",")).eq("tenant", orgId).order("created_at", { ascending: false });
  return { data, status, error };
};
