"use server";
import { createClient } from "@/utils/supabase/server";

export const readSiteDomain = async (domain: string) => {
  const supabase = await createClient();

  // middleware
  try {
    const { data, error } = await supabase.from("Tenant").select().eq("subdomain", domain);
    if (error?.code) return error;

    return data || []; 
  } catch (error) {
    return error;
  }
};
