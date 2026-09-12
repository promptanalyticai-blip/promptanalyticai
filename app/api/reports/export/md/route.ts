import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { reports } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  const result = await db
    .select()
    .from(reports)
    .where(eq(reports.id, id));

  if (!result.length) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const report = result[0];

  return new Response(report.content, {
    headers: {
      "Content-Type": "text/markdown",
      "Content-Disposition": `attachment; filename="${report.title}.md"`,
    },
  });
}
