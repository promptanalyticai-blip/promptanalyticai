import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { teamId, userId, workspaceId } = await req.json();

  const { error } = await supabase.from("team_members").insert([
    { team_id: teamId, user_id: userId }
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await registrarAccion(workspaceId, userId, "agregar miembro equipo", `Team: ${teamId}`);
  await crearNotificacion(workspaceId, userId, "equipo", "Se agregó un miembro al equipo.");

  return NextResponse.json({ ok: true });
}
