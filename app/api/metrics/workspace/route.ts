import { NextResponse } from "next/server";
import { contarTabla, actividadPorDia } from "@/lib/metrics";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const analisis = await contarTabla("analisis", workspaceId);
  const prompts = await contarTabla("prompts", workspaceId);
  const archivos = await contarTabla("files", workspaceId);
  const tareas = await contarTabla("tasks", workspaceId);
  const equipos = await contarTabla("teams", workspaceId);
  const versiones = await contarTabla("versions", workspaceId);
  const automations = await contarTabla("automations", workspaceId);
  const reportes = await contarTabla("reports", workspaceId);

  const actividad = await actividadPorDia("analisis", workspaceId);

  return NextResponse.json({
    analisis,
    prompts,
    archivos,
    tareas,
    equipos,
    versiones,
    automations,
    reportes,
    actividad
  });
}
