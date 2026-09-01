"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UsuariosAdminPage() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  async function cargarUsuarios() {
    const { data } = await supabase.from("user_roles").select("id, user_id, role");
    setUsuarios(data || []);
  }

  async function cambiarRol(id: string, nuevoRol: string) {
    await supabase.from("user_roles").update({ role: nuevoRol }).eq("id", id);
    cargarUsuarios();
  }

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Gestión de usuarios</h1>

      <div className="space-y-4">
        {usuarios.map((u) => (
          <div
            key={u.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">User ID: {u.user_id}</p>
              <p className="text-sm">Rol actual: {u.role}</p>
            </div>

            <select
              value={u.role}
              onChange={(e) => cambiarRol(u.id, e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
