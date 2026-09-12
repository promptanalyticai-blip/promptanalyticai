import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { reports } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const format = searchParams.get("format") || "pdf";

  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  const result = await db.select().from(reports).where(eq(reports.id, id));
  if (!result.length) return Response.json({ error: "Not found" }, { status: 404 });

  const report = result[0];

  if (format === "json") return Response.json(report);

  if (format === "txt") {
    return new Response(report.content, {
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": `attachment; filename="report-${id}.txt"`,
      },
    });
  }

  if (format === "csv") {
    const csv = `id,title,content\n${report.id},"${report.title}","${report.content.replace(/"/g, "'")}"`;
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="report-${id}.csv"`,
      },
    });
  }

  const pdf = await PDFDocument.create();
  const page = pdf.addPage();
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  page.drawText(`${report.title}\n\n${report.content}`, {
    x: 50,
    y: page.getHeight() - 50,
    size: 12,
    font,
    lineHeight: 14,
  });

  const pdfBytes = await pdf.save();

  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="report-${id}.pdf"`,
    },
  });
}
