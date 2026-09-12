import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { auditLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { anthropic } from "@/lib/anthropic";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { workspaceId } = await req.json();
  if (!workspaceId) {
    return Response.json({ error: "Missing workspaceId" }, { status: 400 });
  }

  const logs = await db
    .select()
    .from(auditLogs)
    .where(eq(auditLogs.workspaceId, workspaceId));

  const prompt = `
Analiza la siguiente actividad del workspace y genera:

1. Insights inteligentes
2. Recomendaciones de productividad
3. Sugerencias de automations
4. Sugerencias de tareas
5. Sugerencias de reportes
6. Sugerencias de análisis
7. Patrones detectados
8. Riesgos o problemas
9. Oportunidades de mejora

Actividad:
${JSON.stringify(logs, null, 2)}
`;

  const ai = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 800,
    messages: [{ role: "user", content: prompt }],
  });

  return Response.json({
    insights: ai.content[0].text,
  });
}
