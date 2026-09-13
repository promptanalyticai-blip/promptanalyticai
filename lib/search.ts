import { createClient } from "@/lib/supabase/client";

export async function buscarEnWorkspace(workspaceId: string, query: string) {
  const supabase = createClient();

  const q = `%${query}%`;

  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("workspace_id", workspaceId)
    .or(`nombre.ilike.${q},descripcion.ilike.${q}`);

  if (error) throw error;

  return data;
}
