"use client";

import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [colecciones, setColecciones] = useState<any[]>([]);
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [nombreColeccion, setNombreColeccion] = useState("");
  const [recursoId, setRecursoId] = useState("");
  const [tipo, setTipo] = useState("analisis");
  const [collectionId, setCollectionId] = useState("");

  async function cargarColecciones() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/favorites/collections/list", {
      method: "POST",
      body: JSON.stringify({ workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setColecciones(data);
  }

  async function crearColeccion() {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/favorites/collections/create", {
      method: "POST",
      body: JSON.stringify({ workspaceId, nombre: nombreColeccion }),
      headers: { "Content-Type": "application/json" }
    });

    setNombreColeccion("");
    cargarColecciones();
  }

  async function agregarFavorito() {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/favorites/add", {
      method: "POST",
      body: JSON.stringify({ workspaceId, recursoId, tipo, collectionId }),
      headers: { "Content-Type": "application/json" }
    });

    cargarFavoritos();
  }

  async function cargarFavoritos() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/favorites/list", {
      method: "POST",
      body: JSON.stringify({ workspaceId, collectionId }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setFavoritos(data);
  }

  useEffect(() => {
    cargarColecciones();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Favoritos Avanzados</h1>

      {/* CREAR COLECCIÓN */}
      <div className="max-w-xl space-y-4 mb-10">
        <input
          value={nombreColeccion}
          onChange={(e) => setNombreColeccion(e.target.value)}
          placeholder="Nombre de la colección"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={crearColeccion}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Crear colección
        </button>
      </div>

      {/* LISTA DE COLECCIONES */}
      <h2 className="text-xl font-semibold mb-4">Colecciones</h2>

      <div className="space-y-4 mb-10">
        {colecciones.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setCollectionId(c.id);
              cargarFavoritos();
            }}
            className="block w-full text-left p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover-soft"
          >
            {c.nombre}
          </button>
        ))}
      </div>

      {/* AGREGAR FAVORITO */}
      <div className="max-w-xl space-y-4 mb-10">
        <input
          value={recursoId}
          onChange={(e) => setRecursoId(e.target.value)}
          placeholder="ID del recurso"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="analisis">Análisis</option>
          <option value="prompt">Prompt</option>
          <option value="template">Plantilla</option>
          <option value="archivo">Archivo</option>
          <option value="comentario">Comentario</option>
        </select>

        <button
          onClick={agregarFavorito}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full"
        >
          Agregar a colección
        </button>
      </div>

      {/* FAVORITOS */}
      <h2 className="text-xl font-semibold mb-4">Favoritos de la colección</h2>

      <div className="space-y-4">
        {favoritos.map((f) => (
          <div
            key={f.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <p className="font-semibold">{f.tipo}</p>
            <p className="text-sm opacity-80">Recurso ID: {f.recurso_id}</p>
            <p className="text-xs opacity-60 mt-2">
              {new Date(f.creado).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
