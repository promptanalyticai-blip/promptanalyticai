import { NextResponse } from "next/server";
import { actualizarTarea } from "@/lib/tasks";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { id, estado, workspaceId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  await actualizarTarea(id, estado);

  await registrarAccion(workspaceId, auth.user.id, "actualizar tarea", `Estado: ${estado}`);
  await crearNotificacion(workspaceId, auth.user.id, "tarea", "Estado de tarea actualizado.");

  return NextResponse.json({ ok: true });
}
