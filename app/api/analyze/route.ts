import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { analyses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Anthropic } from "@anthropic-ai/sdk";

export async function POST(req: Request) {
  // Autenticación real
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = userData.user.id;

  // Leer body
  const { promptId, workspaceId, content } = await req.json();

  if (!promptId || !workspaceId || !content) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  // Cliente Claude
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  });

  // Llamada real a Claude 3.5 Sonnet
  const completion = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content,
      },
    ],
  });

  const resultText =
    completion?.content?.[0]?.text || "No se pudo generar análisis.";

  // Guardar análisis en MySQL
  await db.insert(analyses).values({
    id: crypto.randomUUID(),
    promptId,
    userId,
    workspaceId,
    result: resultText,
  });

  return Response.json({
    analysis: resultText,
  });
}
