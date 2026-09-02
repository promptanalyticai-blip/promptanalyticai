import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Listado estará disponible pronto."
  });
}
