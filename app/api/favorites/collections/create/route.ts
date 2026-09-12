import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("favorite_collections")
    .select("*")
    .order("created_at", { ascending: false });

  return Response.json({ data, error });
}
