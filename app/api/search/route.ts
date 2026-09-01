import { NextResponse } from "next/server";
import { buscarEnWorkspace } from "@/lib/search";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { query, workspaceId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const resultados = await buscarEnWorkspace(workspaceId, query);

  return NextResponse.json(resultados);
}
