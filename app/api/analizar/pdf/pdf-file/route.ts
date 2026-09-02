import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({
    error: "Procesamiento de archivos PDF estará disponible pronto."
  });
}
