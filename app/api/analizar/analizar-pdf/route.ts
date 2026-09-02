import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({
    error: "La función de análisis PDF estará disponible pronto."
  });
}
