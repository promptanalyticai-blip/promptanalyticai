"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { crearChat, cargarChats, cargarMensajes } from "@/lib/chat";

export default function ChatPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [listaChats, setListaChats] = useState<any[]>([]);
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [input, setInput] = useState("");

  async function load() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      window.location.href = "/auth/login";
      return;
    }

    setUserId(data.user.id);

    const workspaceId = localStorage.getItem("workspace_id");
    const { data: chats } = await cargarChats(data.user.id, workspaceId);
    setListaChats(chats || []);
  }

  async function abrirChat(id: string) {
    setChatId(id);
    const { data } = await cargarMensajes(id);
    setMensajes(data || []);
  }

  async function nuevoChat() {
    if (!userId) return;
    const workspaceId = localStorage.getItem("workspace_id");

    const { data } = await crearChat(userId, workspaceId, "Nuevo chat");
    setChatId(data.id);
    setMensajes([]);
    load();
  }

  async function enviar() {
    if (!chatId || !input.trim()) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, mensaje: input }),
    });

    const data = await res.json();

    await abrirChat(chatId);
    setInput("");
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex h-screen">

      <div className="w-64 bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto">
        <button
          onClick={nuevoChat}
          className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Nuevo chat
        </button>

        {listaChats.map((c) => (
          <button
            key={c.id}
            onClick={() => abrirChat(c.id)}
            className={`w-full text-left p-3 rounded-lg mb-2 ${
              chatId === c.id ? "bg-blue-200 dark:bg-blue-700" : "bg-white dark:bg-gray-700"
            }`}
          >
            {c.titulo}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {mensajes.map((m) => (
            <div
              key={m.id}
              className={`p-3 rounded-lg max-w-xl ${
                m.rol === "assistant"
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "bg-blue-200 dark:bg-blue-600 ml-auto"
              }`}
            >
              {m.contenido}
            </div>
          ))}
        </div>

        <div className="p-4 border-t dark:border-gray-700 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            onClick={enviar}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Enviar
          </button>
        </div>

      </div>
    </div>
  );
}
