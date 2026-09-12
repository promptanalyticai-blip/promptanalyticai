import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { reports } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Autenticación SSR
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = userData.user.id;

  // Leer body
  const { title, workspaceId } = await req.json();

  if (!title || !workspaceId) {
    return NextResponse.json(
      { error: "Missing fields: title, workspaceId" },
      { status: 400 }
    );
  }

  // Crear reporte base
  const newReport = {
    id: crypto.randomUUID(),
    userId,
    workspaceId,
    title,
    content: "", // se llenará en /generate
    createdAt: new Date(),
  };

  await db.insert(reports).values(newReport);

  return NextResponse.json({
    message: "Reporte creado correctamente.",
    report: newReport,
  });
}
