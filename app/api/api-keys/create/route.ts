import { NextResponse } from "next/server";
import { crearApiKey } from "@/lib/apiKeys";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { nombre, workspaceId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const token = await crearApiKey(workspaceId, nombre);

  return NextResponse.json({ token });
}
