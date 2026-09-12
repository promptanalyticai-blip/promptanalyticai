import { supabaseServer } from "@/lib/supabase/server";

export async function getHistorial() {
  const { data, error } = await supabaseServer
    .from("historial")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}
