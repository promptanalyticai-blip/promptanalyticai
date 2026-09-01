import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { workspaceId, nombre } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const userId = auth.user.id;

  await supabase.from("favorite_collections").insert([
    { workspace_id: workspaceId, user_id: userId, nombre }
  ]);

  await registrarAccion(workspaceId, userId, "crear colección", nombre);
  await crearNotificacion(workspaceId, userId, "favoritos", "Nueva colección creada.");

  return NextResponse.json({ ok: true });
}
