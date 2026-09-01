import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";
import pdfParse from "pdf-parse";
import { llamarClaude } from "../_utils";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;
  const workspaceId = form.get("workspace_id") as string;

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = auth.user.id;

  // Convertir PDF a texto
  const buffer = Buffer.from(await file.arrayBuffer());
  const parsed = await pdfParse(buffer);
  const texto = parsed.text;

  const prompt = `
Eres un analista profesional senior. Responde SOLO en español.

Analiza el siguiente PDF:

${texto}
`;

  const resultado = await llamarClaude(prompt);

  // Guardar análisis
  await supabase.from("analisis").insert([
    {
      texto,
      resultado,
      industria: "pdf",
      user_id: userId,
      workspace_id: workspaceId,
      fecha: new Date().toISOString()
    }
  ]);

  // Auditoría
  await registrarAccion(
    workspaceId,
    userId,
    "analizar PDF",
    `Archivo: ${file.name}`
  );

  // Notificación realtime
  await crearNotificacion(
    workspaceId,
    userId,
    "análisis",
    "Se analizó un archivo PDF."
  );

  return NextResponse.json({ resultado });
}
