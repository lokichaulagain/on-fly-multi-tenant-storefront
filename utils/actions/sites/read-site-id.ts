"use server";
import { createClient } from "@/utils/supabase/server";

export const readSiteById = async (site_id: string) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("sites").select().eq("id", site_id);

    if (error?.code) return error;

    return data;
  } catch (error) {
    return error;
  }
};
