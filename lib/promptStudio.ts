import { supabase } from "@/lib/supabaseClient";
import { generarAnalisisIA } from "@/lib/ia"; // tu función IA existente

export async function crearFlow(workspaceId: string, userId: string, nombre: string, descripcion: string) {
  const { data } = await supabase.from("prompt_flows").insert([
    { workspace_id: workspaceId, user_id: userId, nombre, descripcion }
  ]).select().single();

  return data;
}

export async function agregarPaso(flowId: string, orden: number, prompt: string, variable_salida: string) {
  return supabase.from("prompt_flow_steps").insert([
    { flow_id: flowId, orden, prompt, variable_salida }
  ]);
}

export async function cargarFlows(workspaceId: string) {
  return supabase
    .from("prompt_flows")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("creado", { ascending: false });
}

export async function cargarPasos(flowId: string) {
  return supabase
    .from("prompt_flow_steps")
    .select("*")
    .eq("flow_id", flowId)
    .order("orden", { ascending: true });
}

export async function ejecutarFlow(flowId: string, variables: any) {
  const pasos = await cargarPasos(flowId);
  const contexto: any = { ...variables };

  for (const paso of pasos.data || []) {
    const promptFinal = reemplazarVariables(paso.prompt, contexto);

    const resultado = await generarAnalisisIA(promptFinal);

    contexto[paso.variable_salida] = resultado;
  }

  return contexto;
}

function reemplazarVariables(texto: string, vars: any) {
  let out = texto;
  for (const key in vars) {
    out = out.replaceAll(`{{${key}}}`, vars[key]);
  }
  return out;
}
