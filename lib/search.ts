import { supabase } from "@/lib/supabaseClient";

export async function buscarEnWorkspace(workspaceId: string, query: string) {
  const q = `%${query}%`;

  const [prompts, templates, archivos, analisis, teams] = await Promise.all([
    supabase
      .from("prompts")
      .select("*")
      .eq("workspace_id", workspaceId)
      .ilike("nombre", q),

    supabase
      .from("templates")
      .select("*")
      .eq("workspace_id", workspaceId)
      .ilike("nombre", q),

    supabase
      .from("files")
      .select("*")
      .eq("workspace_id", workspaceId)
      .ilike("nombre", q),

    supabase
      .from("analisis")
      .select("*")
      .eq("workspace_id", workspaceId)
      .ilike("texto", q),

    supabase
      .from("teams")
      .select("*")
      .eq("workspace_id", workspaceId)
      .ilike("nombre", q)
  ]);

  return {
    prompts: prompts.data || [],
    templates: templates.data || [],
    archivos: archivos.data || [],
    analisis: analisis.data || [],
    teams: teams.data || []
  };
}
