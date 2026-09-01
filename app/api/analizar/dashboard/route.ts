import { NextResponse } from "next/server";
import { detectarIdioma, llamarClaude } from "../_utils";

export async function POST(req: Request) {
  const { texto } = await req.json();
  const idioma = detectarIdioma(texto);

  const prompt =
    idioma === "es"
      ? `
Analiza el texto y entrega cada sección por separado para un dashboard. Responde SOLO en español.

Formato:
SECCION: Resumen
SECCION: Detallado
SECCION: Hallazgos
SECCION: Recomendaciones
SECCION: Conclusión

Texto:
${texto}
`
      : `
Analyze the text and deliver each section separately for a dashboard. Respond ONLY in English.

Format:
SECTION: Summary
SECTION: Detailed
SECTION: Findings
SECTION: Recommendations
SECTION: Conclusion

Text:
${texto}
`;

  const data = await llamarClaude(prompt);

  return NextResponse.json(data);
}
