import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generarPDF(titulo: string, contenido: string, workspace: string) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([600, 800]);

  const font = await pdf.embedFont(StandardFonts.Helvetica);

  page.drawText(titulo, {
    x: 50,
    y: 750,
    size: 22,
    font,
    color: rgb(0, 0.2, 0.6),
  });

  page.drawText(`Workspace: ${workspace}`, {
    x: 50,
    y: 720,
    size: 12,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });

  const lines = dividirTexto(contenido, 90);

  let y = 680;
  for (const line of lines) {
    page.drawText(line, {
      x: 50,
      y,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 18;
  }

  const pdfBytes = await pdf.save();
  return pdfBytes;
}

function dividirTexto(texto: string, max: number) {
  const palabras = texto.split(" ");
  const lineas = [];
  let linea = "";

  for (const palabra of palabras) {
    if ((linea + palabra).length > max) {
      lineas.push(linea);
      linea = palabra + " ";
    } else {
      linea += palabra + " ";
    }
  }

  if (linea.length > 0) lineas.push(linea);

  return lineas;
}
