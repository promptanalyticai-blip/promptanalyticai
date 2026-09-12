import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("api_keys")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ data });
}
