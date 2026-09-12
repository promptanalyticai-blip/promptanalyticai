import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { reports } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Anthropic } from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Autenticación SSR
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = userData.user.id;

  // Leer body
  const { reportId, newContent } = await req.json();

  if (!reportId || !newContent) {
    return NextResponse.json(
      { error: "Missing fields: reportId, newContent" },
      { status: 400 }
    );
  }

  // Verificar que el reporte existe y pertenece al usuario
  const existing = await db
    .select()
    .from(reports)
    .where(eq(reports.id, reportId));

  if (!existing.length || existing[0].userId !== userId) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  // Cliente Claude
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  });

  // Regenerar contenido del reporte
  const completion = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `Regenera este reporte profesional con nueva información:\n\n${newContent}`,
      },
    ],
  });

  const updatedText =
    completion?.content?.[0]?.text || "No se pudo regenerar el reporte.";

  // Actualizar reporte existente
  await db
    .update(reports)
    .set({ content: updatedText })
    .where(eq(reports.id, reportId));

  return NextResponse.json({
    success: true,
    reportId,
    content: updatedText,
  });
}
