"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function AuthRegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleRegister = async () => {
    setStatus("Procesando...");

    const { error } = await supabaseBrowser.auth.signUp({
      email,
      password,
    });

    if (error) {
      setStatus("Error: " + error.message);
      return;
    }

    setStatus("Registro exitoso. Revisa tu correo.");
  };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Crear cuenta</h1>

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
        onClick={handleRegister}
        className="bg-green-600 text-white p-2 rounded"
      >
        Registrarse
      </button>

      {status && <p>{status}</p>}
    </div>
  );
}
