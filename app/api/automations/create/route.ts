import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId, nombre, evento, acciones } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { data: automation } = await supabase
    .from("automations")
    .insert([{ workspace_id: workspaceId, user_id: auth.user.id, nombre, evento }])
    .select()
    .single();

  for (const accion of acciones) {
    await supabase.from("automation_actions").insert([
      {
        automation_id: automation.id,
        tipo: accion.tipo,
        configuracion: accion.configuracion
      }
    ]);
  }

  return NextResponse.json({ ok: true });
}
