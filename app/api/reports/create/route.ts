import { NextResponse } from "next/server";
import { crearReporte, agregarSeccion } from "@/lib/reports";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId, nombre, descripcion, secciones } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const reporte = await crearReporte(workspaceId, auth.user.id, nombre, descripcion);

  for (let i = 0; i < secciones.length; i++) {
    await agregarSeccion(reporte.id, i + 1, secciones[i].titulo, secciones[i].prompt);
  }

  return NextResponse.json({ ok: true, reportId: reporte.id });
}