import { NextResponse } from "next/server";
import { cargarColecciones } from "@/lib/favorites";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const colecciones = await cargarColecciones(workspaceId);

  return NextResponse.json(colecciones.data || []);
}
