import { createClient } from "@/lib/supabase/client";

export async function esSuperadmin(userId: string) {
  const supabase = createClient();

  const { data } = await supabase
    .from("admins")
    .select("id")
    .eq("user_id", userId)
    .single();

  return !!data;
}
