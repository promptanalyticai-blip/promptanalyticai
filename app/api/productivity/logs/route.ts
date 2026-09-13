export const dynamic = "force-dynamic";

import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");

  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .eq("workspaceId", workspaceId);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json(data);
}
