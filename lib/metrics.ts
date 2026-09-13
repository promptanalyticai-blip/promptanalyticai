import { createClient } from "@/lib/supabase/client";

export async function contarTabla(tabla: string, workspaceId: string) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from(tabla)
    .select("*", { count: "exact", head: true })
    .eq("workspace_id", workspaceId);

  if (error) throw error;

  return count ?? 0;
}
