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

  const [p, a, r, f, l] = await Promise.all([
    supabase.from("prompts").select("*").eq("workspaceId", workspaceId),
    supabase.from("analyses").select("*").eq("workspaceId", workspaceId),
    supabase.from("reports").select("*").eq("workspaceId", workspaceId),
    supabase.from("files").select("*").eq("workspaceId", workspaceId),
    supabase.from("logs").select("*").eq("workspaceId", workspaceId),
  ]);

  return Response.json({
    prompts: p.data?.length || 0,
    analyses: a.data?.length || 0,
    reports: r.data?.length || 0,
    files: f.data?.length || 0,
    logs: l.data?.length || 0,
  });
}
