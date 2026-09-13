import { supabaseServer } from "@/lib/supabase/server";

export async function getHistorial() {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("historial")
    .select("*")
    .order("created_at", { ascending: false });

  return { data, error };
}
