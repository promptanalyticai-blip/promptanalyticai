import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { reports } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = userData.user.id;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  const result = await db
    .select()
    .from(reports)
    .where(eq(reports.id, id));

  if (!result.length) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const report = result[0];

  // Validación de ownership
  if (report.userId !== userId) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const pdf = await PDFDocument.create();
  const page = pdf.addPage();
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  const margin = 50;
  const lineHeight = 14;
  const maxWidth = page.getWidth() - margin * 2;

  const text = `${report.title}\n\n${report.content}`;

  let y = page.getHeight() - margin;

  // Wrapping manual
  const lines = font.splitTextIntoLines(text, maxWidth);

  for (const line of lines) {
    if (y < margin) {
      const newPage = pdf.addPage();
      y = newPage.getHeight() - margin;
    }

    page.drawText(line, {
      x: margin,
      y,
      size: 12,
      font,
    });

    y -= lineHeight;
  }

  const pdfBytes = await pdf.save();

  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${report.title}.pdf"`,
    },
  });
}
