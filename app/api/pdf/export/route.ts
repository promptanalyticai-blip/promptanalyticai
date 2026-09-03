import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { registrarAccion } from "@/lib/auditoria";

export async function POST(req: Request) {
  const { titulo, contenido, workspaceId, auth } = await req.json();

  // Crear PDF
  const doc = new PDFDocument();
  const chunks: Uint8Array[] = [];

  doc.on("data", (chunk: Uint8Array) => chunks.push(chunk));
  doc.on("end", () => {});

  doc.fontSize(20).text(titulo);
  doc.moveDown();
  doc.fontSize(12).text(contenido);

  doc.end();

  const pdfBytes = Buffer.concat(chunks);

  await registrarAccion(workspaceId!, auth.user.id, "exportar pdf", titulo);

  return new NextResponse(pdfBytes.buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${titulo}.pdf"`,
    },
  });
}
