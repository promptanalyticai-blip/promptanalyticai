import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import ExcelJS from "exceljs";

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

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Exportación");

  sheet.columns = [
    { header: "ID", key: "id", width: 36 },
    { header: "Fecha", key: "fecha", width: 20 },
    { header: "Texto", key: "texto", width: 50 },
    { header: "Resultado", key: "resultado", width: 50 },
    { header: "Industria", key: "industria", width: 20 },
    { header: "Favorito", key: "favorito", width: 10 },
    { header: "Workspace ID", key: "workspace_id", width: 36 },
  ];

  (data || []).forEach((row: any) => {
    sheet.addRow({
      id: row.id,
      fecha: row.fecha,
      texto: row.texto,
      resultado: row.resultado,
      industria: row.industria,
      favorito: row.favorito,
      workspace_id: row.workspace_id,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="export.xlsx"',
    },
  });
}
