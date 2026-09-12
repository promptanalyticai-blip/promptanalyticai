import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { auditLogs } from "@/lib/db/schema";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { workspaceId, action, entityType, entityId, details } = await req.json();

  if (!workspaceId || !action) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  await db.insert(auditLogs).values({
    id: crypto.randomUUID(),
    workspaceId,
    userId: userData.user.id,
    action,
    entityType: entityType || null,
    entityId: entityId || null,
    details: details ? JSON.stringify(details) : null,
  });

  return Response.json({ success: true });
}
