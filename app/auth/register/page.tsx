"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  async function register() {
    setError("");
    setOk("");

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      return;
    }

    // ⭐ Auto‑asignación de rol “user”
    if (data.user) {
      await supabase.from("user_roles").insert([
        { user_id: data.user.id, role: "user" }
      ]);
    }

    setOk("Cuenta creada. Revisa tu email para confirmar.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700 dark:border-gray-600"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700 dark:border-gray-600"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {ok && <p className="text-green-500 text-sm mb-2">{ok}</p>}

        <button
          onClick={register}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover-soft"
        >
          Registrarme
        </button>
      </div>
    </div>
  );
}
