import { NextResponse } from "next/server";
import { crearFlow, agregarPaso } from "@/lib/promptStudio";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId, nombre, descripcion, pasos } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const flow = await crearFlow(workspaceId, auth.user.id, nombre, descripcion);

  for (let i = 0; i < pasos.length; i++) {
    await agregarPaso(flow.id, i + 1, pasos[i].prompt, pasos[i].variable_salida);
  }

  return NextResponse.json({ ok: true, flowId: flow.id });
}
