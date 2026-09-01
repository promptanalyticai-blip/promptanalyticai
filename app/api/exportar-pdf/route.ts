import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { Readable } from "stream";

export async function POST(req: Request) {
  try {
    const { contenido } = await req.json();

    if (!contenido) {
      return NextResponse.json({ error: "No se recibió contenido" }, { status: 400 });
    }

    // Crear PDF en memoria
    const doc = new PDFDocument();
    const stream = doc.pipe(new Readable().wrap(doc));

    doc.fontSize(16).text("Reporte generado por PromptAnalyticAI", { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(contenido);

    doc.end();

    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const pdfBuffer = Buffer.concat(chunks);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=reporte.pdf"
      }
    });

  } catch (error) {
    console.error("Error generando PDF:", error);
    return NextResponse.json({ error: "Error generando PDF" }, { status: 500 });
  }
}
