import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { nombre, workspaceId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const userId = auth.user.id;

  const { data, error } = await supabase.from("teams").insert([
    { nombre, workspace_id: workspaceId, owner_id: userId }
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await registrarAccion(workspaceId, userId, "crear equipo", `Equipo: ${nombre}`);
  await crearNotificacion(workspaceId, userId, "equipo", "Se creó un nuevo equipo.");

  return NextResponse.json({ ok: true });
}
