import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Listado de Flows estará disponible pronto."
  });
}
