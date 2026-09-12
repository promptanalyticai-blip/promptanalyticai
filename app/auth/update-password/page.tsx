"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleUpdate = async () => {
    setStatus("Procesando...");

    const { error } = await supabaseBrowser.auth.updateUser({
      password,
    });

    if (error) {
      setStatus("Error: " + error.message);
      return;
    }

    setStatus("Tu contraseña fue actualizada correctamente.");
  };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Actualizar contraseña</h1>

      <input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        onClick={handleUpdate}
        className="bg-green-600 text-white p-2 rounded"
      >
        Actualizar
      </button>

      {status && <p>{status}</p>}
    </div>
  );
}
