import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { workspaceId, titulo, descripcion, fecha, hora } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const userId = auth.user.id;

  await supabase.from("calendar_events").insert([
    { workspace_id: workspaceId, user_id: userId, titulo, descripcion, fecha, hora }
  ]);

  await registrarAccion(workspaceId, userId, "crear evento", titulo);
  await crearNotificacion(workspaceId, userId, "calendario", "Nuevo evento creado.");

  return NextResponse.json({ ok: true });
}
