import { NextResponse } from "next/server";
import { generarExcel } from "@/lib/excel";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";

export async function POST(req: Request) {
  const { titulo, datos } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const workspaceId = localStorage.getItem("workspace_id");

  const excelBytes = generarExcel(titulo, datos);

  await registrarAccion(workspaceId!, auth.user.id, "exportar excel", titulo);

  return new NextResponse(excelBytes, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${titulo}.xlsx"`,
    },
  });
}
