import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "Ejecución de reportes estará disponible pronto."
  });
}
