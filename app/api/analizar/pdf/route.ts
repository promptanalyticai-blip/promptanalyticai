import { NextResponse } from "next/server";
import { detectarIdioma, llamarClaude } from "../_utils";
import { supabase } from "@/lib/supabaseClient";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { texto, workspace_id } = await req.json();
  const idioma = detectarIdioma(texto);

  const prompt =
    idioma === "es"
      ? `Genera un análisis en formato PDF del siguiente texto. Responde SOLO en español:\n\n${texto}`
      : `Generate a PDF-style analysis of the following text. Respond ONLY in English:\n\n${texto}`;

  const data = await llamarClaude(prompt);

  // Obtener usuario autenticado
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = auth.user.id;

  // Guardar análisis
  await supabase.from("analisis").insert([
    {
      texto,
      resultado: data,
      industria: "pdf",
      user_id: userId,
      workspace_id,
      fecha: new Date().toISOString()
    }
  ]);

  // 🔥 Auditoría
await registrarAccion(
  workspace_id,
  userId,
  "crear análisis",
  "Se creó un análisis en el módulo resumen/profundo/json/pdf/clasificar."
);

  // 🔥 Notificación realtime
  await crearNotificacion(
    workspace_id,
    userId,
    "análisis",
    "Se creó un análisis en formato PDF."
  );

  return NextResponse.json(data);
}
