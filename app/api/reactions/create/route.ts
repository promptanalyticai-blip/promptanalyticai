import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { reactions } from "@/lib/db/schema";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { workspaceId, entityType, entityId, type, value, emoji } = await req.json();

  if (!workspaceId || !entityType || !entityId || !type) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  await db.insert(reactions).values({
    id: crypto.randomUUID(),
    userId: userData.user.id,
    workspaceId,
    entityType,
    entityId,
    type,
    value: value || null,
    emoji: emoji || null,
  });

  return Response.json({ success: true });
}
