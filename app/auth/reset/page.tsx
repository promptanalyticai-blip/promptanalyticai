"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function reset() {
    setMsg("");
    setError("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/update-password`,
    });
    if (error) setError(error.message);
    else setMsg("Te enviamos un enlace para restablecer tu contraseña.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4">Recuperar contraseña</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700 dark:border-gray-600"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {msg && <p className="text-green-500 text-sm mb-2">{msg}</p>}

        <button
          onClick={reset}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover-soft"
        >
          Enviar enlace
        </button>
      </div>
    </div>
  );
}
