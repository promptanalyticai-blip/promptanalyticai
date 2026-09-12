import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { tagRelations } from "@/lib/db/schema";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tagId, entityType, entityId } = await req.json();

  if (!tagId || !entityType || !entityId) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  await db.insert(tagRelations).values({
    id: crypto.randomUUID(),
    tagId,
    entityType,
    entityId,
  });

  return Response.json({ success: true });
}
