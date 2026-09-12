import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { tasks } from "@/lib/db/schema";
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

  const result = await db
    .select()
    .from(tasks)
    .where(eq(tasks.entityId, entityId));

  return Response.json(result);
}
