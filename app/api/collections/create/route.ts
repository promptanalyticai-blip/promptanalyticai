import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "Creación de colecciones estará disponible pronto."
  });
}
