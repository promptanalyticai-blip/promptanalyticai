import { NextResponse } from "next/server";
import { detectarIdioma, llamarClaude } from '../../_utils';

export async function POST(req: Request) {
  const { texto } = await req.json();
  const idioma = detectarIdioma(texto);

  const prompt =
    idioma === "es"
      ? `Resume el siguiente texto en máximo 4 líneas. Responde SOLO en español:\n\n${texto}`
      : `Summarize the following text in no more than 4 lines. Respond ONLY in English:\n\n${texto}`;

  const data = await llamarClaude(prompt);

  return NextResponse.json(data);
}
