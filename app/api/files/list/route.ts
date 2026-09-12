import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { files } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json([], { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");

  if (!workspaceId) {
    return Response.json([], { status: 400 });
  }

  const result = await db
    .select()
    .from(files)
    .where(eq(files.workspaceId, workspaceId));

  return Response.json(result);
}
