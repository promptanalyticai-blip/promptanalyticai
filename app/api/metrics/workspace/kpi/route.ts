import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { prompts, analyses, reports, files, logs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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

  const [p, a, r, f, l] = await Promise.all([
    db.select().from(prompts).where(eq(prompts.workspaceId, workspaceId)),
    db.select().from(analyses).where(eq(analyses.workspaceId, workspaceId)),
    db.select().from(reports).where(eq(reports.workspaceId, workspaceId)),
    db.select().from(files).where(eq(files.workspaceId, workspaceId)),
    db.select().from(logs).where(eq(logs.workspaceId, workspaceId)),
  ]);

  return Response.json({
    prompts: p.length,
    analyses: a.length,
    reports: r.length,
    files: f.length,
    logs: l.length,
  });
}

