import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generarPDF(
  titulo: string,
  contenido: string,
  workspace: string
) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([600, 800]);

  const font = await pdf.embedFont(StandardFonts.Helvetica);

  page.drawText(titulo, {
    x: 50,
    y: 750,
    size: 24,
    font,
    color: rgb(0, 0, 0)
  });

  page.drawText(contenido, {
    x: 50,
    y: 700,
    size: 14,
    font,
    color: rgb(0, 0, 0)
  });

  const bytes = await pdf.save();
  return bytes;
}
