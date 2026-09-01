import { supabase } from "@/lib/supabaseClient";

export async function obtenerKPIs(workspaceId: string) {
  const [analisis, prompts, templates, archivos, teams, miembros] =
    await Promise.all([
      supabase.from("analisis").select("*", { count: "exact" }).eq("workspace_id", workspaceId),
      supabase.from("prompts").select("*", { count: "exact" }).eq("workspace_id", workspaceId),
      supabase.from("templates").select("*", { count: "exact" }).eq("workspace_id", workspaceId),
      supabase.from("files").select("*", { count: "exact" }).eq("workspace_id", workspaceId),
      supabase.from("teams").select("*", { count: "exact" }).eq("workspace_id", workspaceId),
      supabase.from("team_members").select("*", { count: "exact" })
    ]);

  return {
    analisis: analisis.count || 0,
    prompts: prompts.count || 0,
    templates: templates.count || 0,
    archivos: archivos.count || 0,
    teams: teams.count || 0,
    miembros: miembros.count || 0
  };
}
