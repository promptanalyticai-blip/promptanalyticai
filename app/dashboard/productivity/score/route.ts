import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { auditLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { anthropic } from "@/lib/anthropic";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");

  if (!workspaceId) {
    return Response.json({ error: "Missing workspaceId" }, { status: 400 });
  }

  const logs = await db
    .select()
    .from(auditLogs)
    .where(eq(auditLogs.workspaceId, workspaceId));

  // ⭐ Métricas base
  let analysis = 0;
  let reports = 0;
  let files = 0;
  let tasksCompleted = 0;
  let automationsExecuted = 0;
  let reactions = 0;
  let tags = 0;

  for (const log of logs) {
    if (log.action === "analysis_created") analysis++;
    if (log.action === "report_created") reports++;
    if (log.action === "file_uploaded") files++;
    if (log.action === "task_completed") tasksCompleted++;
    if (log.action === "automation_executed") automationsExecuted++;
    if (log.action.startsWith("reaction_")) reactions++;
    if (log.action === "tag_added") tags++;
  }

  // ⭐ Score base
  const score =
    analysis * 5 +
    reports * 4 +
    files * 2 +
    tasksCompleted * 6 +
    automationsExecuted * 8 +
    reactions * 1 +
    tags * 1;

  const normalizedScore = Math.min(100, Math.round(score));

  // ⭐ IA para recomendaciones
  const prompt = `
Genera recomendaciones basadas en este Productivity Score:

Score: ${normalizedScore}

Métricas:
- Análisis: ${analysis}
- Reportes: ${reports}
- Archivos: ${files}
- Tareas completadas: ${tasksCompleted}
- Automations ejecutadas: ${automationsExecuted}
- Reacciones: ${reactions}
- Tags: ${tags}

Formato:
{
  "summary": "texto",
  "recommendations": ["texto", "texto", ...],
  "alerts": ["texto", "texto", ...]
}
`;

  const ai = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 600,
    messages: [{ role: "user", content: prompt }],
  });

  let insights = {};

  try {
    insights = JSON.parse(ai.content[0].text);
  } catch {
    insights = { summary: ai.content[0].text };
  }

  return Response.json({
    score: normalizedScore,
    metrics: {
      analysis,
      reports,
      files,
      tasksCompleted,
      automationsExecuted,
      reactions,
      tags,
    },
    insights,
  });
}
