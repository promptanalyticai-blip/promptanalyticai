"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    // 1. Crear usuario en Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    const user = data.user;

    // 2. Crear perfil en la tabla profiles
    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: user?.id,
      full_name: fullName,
      role: "user",
    });

    if (profileError) {
      setError(profileError.message);
      return;
    }

    // 3. Redirigir al dashboard
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Crear cuenta</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Nombre completo"
        className="w-full p-3 border rounded mb-4"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full p-3 border rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        className="w-full p-3 border rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
      >
        Registrarme
      </button>
    </div>
  );
}
