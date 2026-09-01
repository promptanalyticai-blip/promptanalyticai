"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function update() {
    setMsg("");
    setError("");

    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      setError("Usuario no autenticado.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) setError(error.message);
    else setMsg("Contraseña actualizada correctamente.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4">Nueva contraseña</h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nueva contraseña"
          className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700 dark:border-gray-600"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {msg && <p className="text-green-500 text-sm mb-2">{msg}</p>}

        <button
          onClick={update}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover-soft"
        >
          Actualizar contraseña
        </button>
      </div>
    </div>
  );
}
