"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [error, setError] = useState("");

  async function cargarWorkspaces() {
    const res = await fetch("/api/admin/workspaces", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    if (data.error) {
      setError("No tienes permisos de superadmin.");
      return;
    }

    setWorkspaces(data);
  }

  async function cargarUsuarios() {
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    if (data.error) {
      setError("No tienes permisos de superadmin.");
      return;
    }

    setUsuarios(data);
  }

  async function suspender(id: string) {
    await fetch("/api/admin/suspend", {
      method: "POST",
      body: JSON.stringify({ userId: id }),
      headers: { "Content-Type": "application/json" }
    });

    cargarUsuarios();
  }

  useEffect(() => {
    cargarWorkspaces();
    cargarUsuarios();
  }, []);

  if (error) {
    return (
      <div className="p-10 text-center text-red-600 text-xl font-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Panel de Superadmin</h1>

      {/* WORKSPACES */}
      <h2 className="text-xl font-semibold mb-4">Workspaces</h2>
      <div className="space-y-4 mb-10">
        {workspaces.map((ws) => (
          <div key={ws.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="font-bold">{ws.nombre}</p>
            <p className="text-sm opacity-80">ID: {ws.id}</p>
          </div>
        ))}
      </div>

      {/* USUARIOS */}
      <h2 className="text-xl font-semibold mb-4">Usuarios</h2>
      <div className="space-y-4">
        {usuarios.map((u) => (
          <div key={u.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="font-bold">{u.nombre}</p>
            <p className="text-sm opacity-80">{u.email}</p>

            <button
              onClick={() => suspender(u.id)}
              className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Suspender usuario
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

