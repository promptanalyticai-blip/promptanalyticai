import { NextResponse } from "next/server";
import { validarToken } from "@/lib/apiKeys";
import { registrarUso, verificarRateLimit } from "@/lib/rateLimit";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { token, analisisId } = await req.json();

  const key = await validarToken(token);
  if (!key) return NextResponse.json({ error: "Token inválido" }, { status: 403 });

  if (await verificarRateLimit(token)) {
    return NextResponse.json({ error: "Rate limit excedido" }, { status: 429 });
  }

  await registrarUso(token);

  const { data } = await supabase
    .from("analisis")
    .select("*")
    .eq("id", analisisId)
    .single();

  return NextResponse.json(data || {});
}
