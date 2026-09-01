import { supabase } from "@/lib/supabaseClient";

export async function contarTabla(tabla: string, workspaceId: string) {
  const { count } = await supabase
    .from(tabla)
    .select("*", { count: "exact", head: true })
    .eq("workspace_id", workspaceId);

  return count || 0;
}

export async function actividadPorDia(tabla: string, workspaceId: string) {
  const { data } = await supabase
    .from(tabla)
    .select("creado")
    .eq("workspace_id", workspaceId);

  const mapa: any = {};

  for (const item of data || []) {
    const fecha = item.creado.split("T")[0];
    mapa[fecha] = (mapa[fecha] || 0) + 1;
  }

  return mapa;
}
