"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TasksPage() {
  const [lista, setLista] = useState<any[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [asignadoId, setAsignadoId] = useState("");
  const [prioridad, setPrioridad] = useState("media");
  const [fechaLimite, setFechaLimite] = useState("");

  async function cargar() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/tasks/list", {
      method: "POST",
      body: JSON.stringify({ workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setLista(data);
  }

  async function crear() {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/tasks/create", {
      method: "POST",
      body: JSON.stringify({
        workspaceId,
        asignadoId,
        titulo,
        descripcion,
        prioridad,
        fecha_limite: fechaLimite
      }),
      headers: { "Content-Type": "application/json" }
    });

    setTitulo("");
    setDescripcion("");
    setAsignadoId("");
    setFechaLimite("");

    cargar();
  }

  async function actualizar(id: string, estado: string) {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/tasks/update", {
      method: "POST",
      body: JSON.stringify({ id, estado, workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    cargar();
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Tareas</h1>

      {/* CREAR TAREA */}
      <div className="max-w-xl space-y-4 mb-10">

        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título de la tarea"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          className="w-full p-3 border rounded-lg min-h-[100px] dark:bg-gray-700 dark:border-gray-600"
        />

        <input
          value={asignadoId}
          onChange={(e) => setAsignadoId(e.target.value)}
          placeholder="ID del usuario asignado"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <select
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>

        <input
          type="date"
          value={fechaLimite}
          onChange={(e) => setFechaLimite(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={crear}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Crear tarea
        </button>
      </div>

      {/* LISTA DE TAREAS */}
      <h2 className="text-xl font-semibold mb-4">Tareas del workspace</h2>

      <div className="space-y-4">
        {lista.map((t) => (
          <div
            key={t.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <h3 className="font-bold">{t.titulo}</h3>
            <p className="text-sm opacity-80">{t.descripcion}</p>

            <p className="text-sm mt-2">
              Estado: <strong>{t.estado}</strong>
            </p>

            <p className="text-sm">
              Prioridad: <strong>{t.prioridad}</strong>
            </p>

            <p className="text-sm">
              Fecha límite: {t.fecha_limite || "Sin fecha"}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => actualizar(t.id, "pendiente")}
                className="px-3 py-1 bg-gray-600 text-white rounded"
              >
                Pendiente
              </button>

              <button
                onClick={() => actualizar(t.id, "progreso")}
                className="px-3 py-1 bg-yellow-600 text-white rounded"
              >
                En progreso
              </button>

              <button
                onClick={() => actualizar(t.id, "completada")}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Completada
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
