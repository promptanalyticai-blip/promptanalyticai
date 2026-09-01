import { NextResponse } from "next/server";
import { ejecutarReporte } from "@/lib/reports";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { reportId, variables } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const resultado = await ejecutarReporte(reportId, variables);

  return NextResponse.json(resultado);
}
