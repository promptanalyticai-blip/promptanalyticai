import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { Readable } from "stream";

export async function POST(req: Request) {
  const { titulo, texto, resultado, industria } = await req.json();

  const doc = new PDFDocument({ size: "A4", margin: 40 });
  const stream = doc.pipe(new Readable().wrap(doc));

  doc.fontSize(22).fillColor("#1a1a1a").text("PromptAnalyticAI", { align: "center" }).moveDown(1);
  doc.fontSize(14).fillColor("#555").text(titulo || "Reporte de análisis", { align: "center" }).moveDown(2);

  doc.fontSize(12).fillColor("#333").text(`Industria: ${industria || "No especificada"}`).moveDown(1);
  doc.fontSize(12).fillColor("#333").text(`Fecha: ${new Date().toLocaleString()}`).moveDown(2);

  doc.fontSize(16).fillColor("#000").text("Texto analizado", { underline: true }).moveDown(1);
  doc.fontSize(12).fillColor("#333").text(texto, { align: "justify" }).moveDown(2);

  doc.fontSize(16).fillColor("#000").text("Resultado del análisis", { underline: true }).moveDown(1);
  doc.fontSize(12).fillColor("#333").text(resultado, { align: "justify" });

  doc.end();

  const chunks: any[] = [];
  for await (const chunk of stream) chunks.push(chunk);

  const pdfBuffer = Buffer.concat(chunks);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="analisis.pdf"`,
    },
  });
}
