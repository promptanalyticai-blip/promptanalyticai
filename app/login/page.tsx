"use client";

import { createClient } from "@/utils/supabase/client";
import React from "react";

export default function LoginPage() {
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = (e.currentTarget as any).email.value;
    const password = (e.currentTarget as any).password.value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      window.location.href = "/dashboard";
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
      />

      <button type="submit">Entrar</button>
    </form>
  );
}
