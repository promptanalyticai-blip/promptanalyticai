"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function updatePassword() {
    setError("");
    setMessage("");

    const { error } = await supabase.auth.updateUser({ password });
    if (error) setError(error.message);
    else setMessage("Contraseña actualizada correctamente.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4">Actualizar contraseña</h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nueva contraseña"
          className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700 dark:border-gray-600"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-2">{message}</p>}

        <button
          onClick={updatePassword}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover-soft mb-2"
        >
          Actualizar
        </button>

        <a href="/auth/login" className="text-sm text-blue-600 dark:text-blue-400 block">
          Volver al login
        </a>
      </div>
    </div>
  );
}
