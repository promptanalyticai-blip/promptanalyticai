import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { logs } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

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

  const result = await db
    .select({
      day: sql`DATE(created_at)`,
      count: sql`COUNT(*)`,
    })
    .from(logs)
    .where(eq(logs.workspaceId, workspaceId))
    .groupBy(sql`DATE(created_at)`);

  return Response.json(result);
}
