export const dynamic = "force-dynamic";

import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = supabaseServer();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");

  if (!workspaceId) {
    return Response.json({ error: "Missing workspaceId" }, { status: 400 });
  }

  const { data: logs, error } = await supabase
    .from("logs")
    .select("*")
    .eq("workspaceId", workspaceId);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const score = logs.length * 3;

  return Response.json({ score });
}
