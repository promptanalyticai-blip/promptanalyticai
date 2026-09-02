import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    return NextResponse.json({
      message: "Resumen estará disponible pronto.",
      received: body
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
