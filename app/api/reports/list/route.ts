import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Listado de reportes estará disponible pronto."
  });
}
