import { supabase } from "@/lib/supabaseClient";
import { generarAnalisisIA } from "@/lib/ia";

export async function crearReporte(workspaceId: string, userId: string, nombre: string, descripcion: string) {
  const { data } = await supabase
    .from("reports")
    .insert([{ workspace_id: workspaceId, user_id: userId, nombre, descripcion }])
    .select()
    .single();

  return data;
}

export async function agregarSeccion(reportId: string, orden: number, titulo: string, prompt: string) {
  return supabase.from("report_sections").insert([
    { report_id: reportId, orden, titulo, prompt }
  ]);
}

export async function cargarReportes(workspaceId: string) {
  return supabase
    .from("reports")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("creado", { ascending: false });
}

export async function cargarSecciones(reportId: string) {
  return supabase
    .from("report_sections")
    .select("*")
    .eq("report_id", reportId)
    .order("orden", { ascending: true });
}

export async function ejecutarReporte(reportId: string, variables: any) {
  const secciones = await cargarSecciones(reportId);
  const resultado: any[] = [];

  for (const sec of secciones.data || []) {
    const promptFinal = reemplazarVariables(sec.prompt, variables);
    const contenido = await generarAnalisisIA(promptFinal);

    resultado.push({
      titulo: sec.titulo,
      contenido
    });
  }

  return resultado;
}

function reemplazarVariables(texto: string, vars: any) {
  let out = texto;
  for (const key in vars) {
    out = out.replaceAll(`{{${key}}}`, vars[key]);
  }
  return out;
}
