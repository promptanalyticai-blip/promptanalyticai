"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function UsuariosAdminPage() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabaseBrowser.from("usuarios").select("*");

      if (!error) {
        setUsuarios(data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Usuarios</h1>

      <ul className="mt-4">
        {usuarios.map((u) => (
          <li key={u.id} className="border p-2 rounded mb-2">
            {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
