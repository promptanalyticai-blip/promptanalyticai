"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleReset = async () => {
    setStatus("Procesando...");

    const { data, error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      setStatus("Error: " + error.message);
      return;
    }

    setStatus("Se envió un enlace para restablecer tu contraseña.");
  };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Restablecer contraseña</h1>

      <input
        type="email"
        placeholder="Tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        onClick={handleReset}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Enviar enlace
      </button>

      {status && <p>{status}</p>}
    </div>
  );
}
