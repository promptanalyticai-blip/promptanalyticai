import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { auditLogs, automations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { anthropic } from "@/lib/anthropic";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { workspaceId, autoCreate } = await req.json();
  if (!workspaceId) {
    return Response.json({ error: "Missing workspaceId" }, { status: 400 });
  }

  const logs = await db
    .select()
    .from(auditLogs)
    .where(eq(auditLogs.workspaceId, workspaceId));

  const prompt = `
Analiza la actividad del workspace y genera automations sugeridas.

Formato de salida:
[
  {
    "name": "string",
    "trigger": "string",
    "action": "string",
    "conditions": {}
  }
]

Actividad:
${JSON.stringify(logs, null, 2)}
`;

  const ai = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 800,
    messages: [{ role: "user", content: prompt }],
  });

  let suggestions = [];

  try {
    suggestions = JSON.parse(ai.content[0].text);
  } catch {
    return Response.json({
      error: "AI returned invalid JSON",
      raw: ai.content[0].text,
    });
  }

  // ⭐ Crear automations automáticamente si autoCreate = true
  if (autoCreate) {
    for (const s of suggestions) {
      await db.insert(automations).values({
        id: crypto.randomUUID(),
        workspaceId,
        name: s.name,
        trigger: s.trigger,
        action: s.action,
        conditions: JSON.stringify(s.conditions || {}),
      });
    }
  }

  return Response.json({
    suggestions,
    created: autoCreate ? suggestions.length : 0,
  });
}
