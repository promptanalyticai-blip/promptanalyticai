export const dynamic = "force-dynamic";

import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const supabase = supabaseServer();
  const { data, error } = await supabase.from("metrics").select("*");

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json(data);
}
