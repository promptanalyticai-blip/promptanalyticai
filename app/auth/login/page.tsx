"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login() {
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

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

        <button
          onClick={login}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover-soft mb-2"
        >
          Entrar
        </button>

        <a href="/auth/register" className="text-sm text-blue-600 dark:text-blue-400 block mb-1">
          Crear cuenta
        </a>
        <a href="/auth/reset" className="text-sm text-blue-600 dark:text-blue-400 block">
          Olvidé mi contraseña
        </a>
      </div>
    </div>
  );
}
