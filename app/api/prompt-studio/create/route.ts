import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "Crear Flow estará disponible pronto."
  });
}
