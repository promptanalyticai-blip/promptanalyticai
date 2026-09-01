import { NextResponse } from "next/server";
import { ejecutarFlow } from "@/lib/promptStudio";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { flowId, variables } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const resultado = await ejecutarFlow(flowId, variables);

  return NextResponse.json(resultado);
}
