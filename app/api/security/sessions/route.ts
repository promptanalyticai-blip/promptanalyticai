import { NextResponse } from "next/server";
import { cargarSesiones } from "@/lib/security";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const sesiones = await cargarSesiones(auth.user.id);

  return NextResponse.json(sesiones.data || []);
}
