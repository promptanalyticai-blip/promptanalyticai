"use client";

import { useEffect, useState } from "react";

export default function CalendarPage() {
  const [lista, setLista] = useState<any[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  async function cargar() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/calendar/list", {
      method: "POST",
      body: JSON.stringify({ workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setLista(data);
  }

  async function crear() {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/calendar/create", {
      method: "POST",
      body: JSON.stringify({ workspaceId, titulo, descripcion, fecha, hora }),
      headers: { "Content-Type": "application/json" }
    });

    setTitulo("");
    setDescripcion("");
    setFecha("");
    setHora("");

    cargar();
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Calendario</h1>

      {/* CREAR EVENTO */}
      <div className="max-w-xl space-y-4 mb-10">

        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título del evento"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          className="w-full p-3 border rounded-lg min-h-[100px] dark:bg-gray-700 dark:border-gray-600"
        />

        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={crear}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Crear evento
        </button>
      </div>

      {/* LISTA DE EVENTOS */}
      <h2 className="text-xl font-semibold mb-4">Eventos del workspace</h2>

      <div className="space-y-4">
        {lista.map((e) => (
          <div
            key={e.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <h3 className="font-bold">{e.titulo}</h3>
            <p className="text-sm opacity-80">{e.descripcion}</p>

            <p className="text-sm mt-2">
              Fecha: <strong>{e.fecha}</strong>
            </p>

            <p className="text-sm">
              Hora: <strong>{e.hora || "Sin hora"}</strong>
            </p>

            <p className="text-xs opacity-60 mt-2">
              Creado: {new Date(e.creado).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
