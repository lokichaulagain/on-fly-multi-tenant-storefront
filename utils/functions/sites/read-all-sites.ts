import { createClient } from "@/utils/supabase/server";

export const readAllSites = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("sites")
      .select()
      .order('created_at', { ascending: false }); // Adjust the column name as per your table schema

    if (error?.code) return error;

    return data;
  } catch (error) {
    return error;
  }
};
