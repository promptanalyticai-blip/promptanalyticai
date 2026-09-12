import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { tags, tagRelations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json([], { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const entityId = searchParams.get("entityId");

  if (!entityId) {
    return Response.json([], { status: 400 });
  }

  const relations = await db
    .select()
    .from(tagRelations)
    .where(eq(tagRelations.entityId, entityId));

  const tagIds = relations.map((r) => r.tagId);

  if (tagIds.length === 0) return Response.json([]);

  const result = await db
    .select()
    .from(tags)
    .where(tags.id.in(tagIds));

  return Response.json(result);
}
