import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { reactions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json([], { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const entityType = searchParams.get("entityType");
  const entityId = searchParams.get("entityId");

  if (!entityType || !entityId) {
    return Response.json([], { status: 400 });
  }

  const result = await db
    .select()
    .from(reactions)
    .where(eq(reactions.entityId, entityId));

  return Response.json(result);
}
