import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { workspaceId, asignadoId, titulo, descripcion, prioridad, fecha_limite } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const creadorId = auth.user.id;

  await supabase.from("tasks").insert([
    { workspace_id: workspaceId, creador_id: creadorId, asignado_id: asignadoId, titulo, descripcion, prioridad, fecha_limite }
  ]);

  await registrarAccion(workspaceId, creadorId, "crear tarea", titulo);
  await crearNotificacion(workspaceId, creadorId, "tarea", "Nueva tarea creada.");

  return NextResponse.json({ ok: true });
}
