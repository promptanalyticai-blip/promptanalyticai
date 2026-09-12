import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { automations, automationLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { workspaceId, trigger, payload } = await req.json();

  if (!workspaceId || !trigger) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const workflows = await db
    .select()
    .from(automations)
    .where(eq(automations.workspaceId, workspaceId));

  const matches = workflows.filter((w) => w.trigger === trigger && w.active === "true");

  for (const w of matches) {
    let result = "";

    if (w.action === "create_task") {
      await db.insert(automationLogs).values({
        id: crypto.randomUUID(),
        automationId: w.id,
        workspaceId,
        trigger,
        action: w.action,
        result: "Task created automatically",
      });
    }

    if (w.action === "generate_analysis") {
      await db.insert(automationLogs).values({
        id: crypto.randomUUID(),
        automationId: w.id,
        workspaceId,
        trigger,
        action: w.action,
        result: "Analysis generated automatically",
      });
    }

    if (w.action === "export_pdf") {
      await db.insert(automationLogs).values({
        id: crypto.randomUUID(),
        automationId: w.id,
        workspaceId,
        trigger,
        action: w.action,
        result: "PDF exported automatically",
      });
    }
  }

  return Response.json({ success: true });
}
