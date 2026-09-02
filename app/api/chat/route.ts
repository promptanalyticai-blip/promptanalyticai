import { NextResponse } from "next/server";
import { cargarMensajes } from "@/lib/chat/cargarMensajes";
import { generarRespuestaIA } from "@/lib/chat/generarRespuestaIA";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { chat_id, mensaje } = body;

    if (!chat_id || !mensaje) {
      return NextResponse.json(
        { ok: false, error: "chat_id y mensaje son requeridos" },
        { status: 400 }
      );
    }

    // Cargar historial del chat
    const { data: historial } = await cargarMensajes(chat_id);

    // FIX: historial puede ser null → usamos []
    const messages = (historial ?? []).map((m: any) => ({
      role: m.rol,
      content: m.contenido,
    }));

    // Agregar el mensaje del usuario
    messages.push({
      role: "user",
      content: mensaje,
    });

    // Generar respuesta con IA
    const respuestaIA = await generarRespuestaIA(messages);

    return NextResponse.json({
      ok: true,
      chat_id,
      mensaje_usuario: mensaje,
      respuesta_ia: respuestaIA,
    });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return NextResponse.json(
      { ok: false, error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
