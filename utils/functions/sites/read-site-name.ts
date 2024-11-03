import { createClient } from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";

export const readSiteName = async (site_name: string) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("sites")
      .select()
      .eq("user_id", userId)
      .eq("site_name", site_name);

    if (error?.code) return error;

    return data;
  } catch (error) {
    return error;
  }
};
