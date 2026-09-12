import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { workspaceId, trigger, payload } = await req.json();

  if (!workspaceId || !trigger) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const { data: workflows } = await supabase
    .from("automations")
    .select("*")
    .eq("workspaceId", workspaceId);

  const matches = workflows.filter((w) => w.trigger === trigger && w.active === "true");

  for (const w of matches) {
    await supabase.from("automationLogs").insert({
      id: crypto.randomUUID(),
      automationId: w.id,
      workspaceId,
      trigger,
      action: w.action,
      result:
        w.action === "create_task"
          ? "Task created automatically"
          : w.action === "generate_analysis"
          ? "Analysis generated automatically"
          : "PDF exported automatically",
    });
  }

  return Response.json({ success: true });
}
