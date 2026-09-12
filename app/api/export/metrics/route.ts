import { supabaseServer } from "@/lib/supabaseServer";
import { db } from "@/lib/db/client";
import { automations, automationLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");
  const format = searchParams.get("format") || "json";

  if (!workspaceId) return Response.json({ error: "Missing workspaceId" }, { status: 400 });

  const [a, l] = await Promise.all([
    db.select().from(automations).where(eq(automations.workspaceId, workspaceId)),
    db.select().from(automationLogs).where(eq(automationLogs.workspaceId, workspaceId)),
  ]);

  const metrics = {
    automations: a.length,
    automationLogs: l.length,
  };

  if (format === "json") return Response.json(metrics);

  if (format === "txt") {
    const txt = Object.entries(metrics)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    return new Response(txt, {
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": `attachment; filename="metrics-${workspaceId}.txt"`,
      },
    });
  }

  if (format === "csv") {
    const csv = `metric,value\n${Object.entries(metrics)
      .map(([k, v]) => `${k},${v}`)
      .join("\n")}`;

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="metrics-${workspaceId}.csv"`,
      },
    });
  }

  return Response.json({ error: "Unsupported format" }, { status: 400 });
}
