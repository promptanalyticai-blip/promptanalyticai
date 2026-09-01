export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Anthropic } from "@anthropic-ai/sdk";

const prompts = {
  general: `Eres un analista profesional. Analiza este texto y produce:
- Resumen
- Insights
- Puntos clave
- Recomendaciones
Texto:
`,
  marketing: `Eres un analista profesional de marketing. Analiza este texto y produce:
- Resumen
- Objetivo del mensaje
- Análisis de audiencia
- Fortalezas
- Debilidades
- Recomendaciones
Texto:
`,
  realestate: `Eres un analista inmobiliario profesional. Analiza este texto y produce:
- Resumen
- Análisis de propiedad
- Análisis de mercado
- Riesgos
- Oportunidades
- Recomendaciones de inversión
Texto:
`,
  ecommerce: `Eres un analista de e-commerce. Analiza este texto y produce:
- Resumen
- Análisis de producto
- Análisis de competencia
- Oportunidades de venta
- Riesgos
- Recomendaciones
Texto:
`,
  legal: `Eres un analista legal profesional. Analiza este documento y produce:
- Resumen
- Riesgos legales
- Puntos críticos
- Lenguaje complejo simplificado
- Recomendaciones
Texto:
`,
  rrhh: `Eres un analista profesional de Recursos Humanos. Analiza este texto y produce:
- Resumen del candidato o documento
- Competencias principales
- Competencias faltantes
- Análisis de personalidad
- Compatibilidad con el puesto
- Riesgos potenciales
- Fortalezas destacadas
- Recomendaciones de contratación
Texto:
`,
} as const;

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { text, type } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Se requiere un texto válido." },
        { status: 400 }
      );
    }

    const promptType = type as keyof typeof prompts;
    const prompt = prompts[promptType] ?? prompts.general;

    const client = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY!,
    });

    const response = await client.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: prompt + text,
        },
      ],
    });

    const analysis =
      response.content[0]?.type === "text"
        ? response.content[0].text
        : "No se pudo generar el análisis.";

    await supabase.from("analytics").insert({
      text,
      analysis,
      type: promptType,
    });

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error al analizar texto:", error);

    return NextResponse.json(
      {
        error: "Hubo un error al procesar la solicitud.",
      },
      { status: 500 }
    );
  }
}
