"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  cargarMiembrosWorkspace,
  agregarMiembroWorkspace,
  cambiarRolWorkspace,
  eliminarMiembroWorkspace,
} from "@/lib/workspaceRoles";

export default function WorkspaceMembersPage() {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [miembros, setMiembros] = useState<any[]>([]);
  const [email, setEmail] = useState("");

  async function load() {
    const id = localStorage.getItem("workspace_id");
    setWorkspaceId(id);

    const { data } = await cargarMiembrosWorkspace(id!);
    setMiembros(data || []);
  }

  async function invitar() {
    const { data: user } = await supabase
      .from("auth.users")
      .select("id")
      .eq("email", email)
      .single();

    if (!user) return;

    await agregarMiembroWorkspace(user.id, workspaceId!, "viewer");
    setEmail("");
    load();
  }

  async function cambiarRol(id: string, role: string) {
    await cambiarRolWorkspace(id, role);
    load();
  }

  async function eliminar(id: string) {
    await eliminarMiembroWorkspace(id);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Miembros del Workspace</h1>

      <div className="max-w-lg space-y-4 mb-10">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email del usuario"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={invitar}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full"
        >
          Invitar usuario
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Miembros</h2>

      <div className="space-y-4">
        {miembros.map((m) => (
          <div key={m.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="font-semibold">User ID: {m.user_id}</p>
            <p className="text-sm mb-2">Rol: {m.role}</p>

            <select
              value={m.role}
              onChange={(e) => cambiarRol(m.id, e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="owner">owner</option>
              <option value="admin">admin</option>
              <option value="editor">editor</option>
              <option value="viewer">viewer</option>
            </select>

            <button
              onClick={() => eliminar(m.id)}
              className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
