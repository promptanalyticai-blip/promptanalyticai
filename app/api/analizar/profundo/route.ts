import { NextResponse } from "next/server";
import { detectarIdioma, llamarClaude } from "../_utils";
import { supabase } from "@/lib/supabaseClient";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { texto, workspace_id } = await req.json();
  const idioma = detectarIdioma(texto);

  const prompt =
    idioma === "es"
      ? `
Eres un analista profesional senior. Responde SOLO en español.

Estructura tu análisis así:
1. Resumen Ejecutivo
2. Análisis Detallado
3. Hallazgos Clave
4. Recomendendaciones
5. Conclusión

Texto:
${texto}
`
      : `
You are a senior professional analyst. Respond ONLY in English.

Structure your analysis as follows:
1. Executive Summary
2. Detailed Analysis
3. Key Findings
4. Recommendations
5. Conclusion

Text:
${texto}
`;

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
      industria: "profundo",
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
    "Se creó un nuevo análisis profundo."
  );

  return NextResponse.json(data);
}
