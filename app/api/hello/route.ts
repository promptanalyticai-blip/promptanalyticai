import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Tu proyecto está funcionando correctamente en Vercel 🚀"
  });
}
