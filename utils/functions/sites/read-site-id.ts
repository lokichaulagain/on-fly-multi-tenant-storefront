import { createClient } from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";

export const readSiteId = async (id: string) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("sites").select().eq("user_id", userId).eq("site_id", id);

    if (error?.code) return error;

    return data;
  } catch (error) {
    return error;
  }
};
