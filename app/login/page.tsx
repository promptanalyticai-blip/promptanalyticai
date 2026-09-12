"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async () => {
    setStatus("Procesando...");

    const { data, error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus("Error: " + error.message);
      return;
    }

    setStatus("Inicio de sesión exitoso.");
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Iniciar sesión</h1>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Entrar
      </button>

      {status && <p>{status}</p>}
    </div>
  );
}
