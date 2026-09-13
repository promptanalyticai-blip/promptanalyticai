import { createClient } from "@/lib/supabase/client";

export async function obtenerKPIs(workspaceId: string) {
  const supabase = createClient();

  const [analisis, prompts, templates, archivos, teams, miembros] =
    await Promise.all([
      supabase
        .from("analysis")
        .select("*", { count: "exact", head: true })
        .eq("workspace_id", workspaceId),

      supabase
        .from("prompts")
        .select("*", { count: "exact", head: true })
        .eq("workspace_id", workspaceId),

      supabase
        .from("templates")
        .select("*", { count: "exact", head: true })
        .eq("workspace_id", workspaceId),

      supabase
        .from("files")
        .select("*", { count: "exact", head: true })
        .eq("workspace_id", workspaceId),

      supabase
        .from("teams")
        .select("*", { count: "exact", head: true })
        .eq("workspace_id", workspaceId),

      supabase
        .from("team_members")
        .select("*", { count: "exact", head: true })
        .eq("workspace_id", workspaceId)
    ]);

  return {
    analisis: analisis.count ?? 0,
    prompts: prompts.count ?? 0,
    templates: templates.count ?? 0,
    archivos: archivos.count ?? 0,
    teams: teams.count ?? 0,
    miembros: miembros.count ?? 0
  };
}
