import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { reports } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Autenticación SSR
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return NextResponse.json([], { status: 200 });
  }

  const userId = userData.user.id;

  // Leer workspaceId desde query params
  const url = new URL(req.url);
  const workspaceId = url.searchParams.get("workspaceId");

  if (!workspaceId) {
    return NextResponse.json(
      { error: "Missing workspaceId" },
      { status: 400 }
    );
  }

  // Consultar reportes del usuario y workspace
  const result = await db
    .select({
      id: reports.id,
      title: reports.title,
      createdAt: reports.createdAt,
    })
    .from(reports)
    .where(eq(reports.userId, userId))
    .where(eq(reports.workspaceId, workspaceId));

  return NextResponse.json(result);
}
