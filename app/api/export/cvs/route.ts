import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspace_id, industria, fecha_inicio, fecha_fin } = await req.json();

  let query = supabase.from("analisis").select("*");

  if (workspace_id) query = query.eq("workspace_id", workspace_id);
  if (industria) query = query.eq("industria", industria);
  if (fecha_inicio) query = query.gte("fecha", fecha_inicio);
  if (fecha_fin) query = query.lte("fecha", fecha_fin);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const headers = ["id", "fecha", "texto", "resultado", "industria", "favorito", "workspace_id"];

  const rows = (data || []).map((row: any) =>
    headers.map((h) => `"${String(row[h] ?? "").replace(/"/g, '""')}"`).join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="export.csv"',
    },
  });
}
