import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 });
    }

    // Convertir el archivo a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extraer texto del PDF
    const pdfData = await pdfParse(buffer);
    const textoExtraido = pdfData.text;

    // Aquí luego llamaremos a Claude para análisis real
    const resultado = `Texto extraído del PDF:\n\n${textoExtraido.slice(0, 2000)}...`;

    return NextResponse.json({ resultado });
  } catch (error) {
    console.error("Error procesando PDF:", error);
    return NextResponse.json({ error: "Error al procesar el PDF" }, { status: 500 });
  }
}
