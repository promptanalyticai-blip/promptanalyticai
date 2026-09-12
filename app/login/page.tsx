"use client";

import { supabase } from "@/lib/supabaseClient";
import React from "react";

export default function LoginPage() {
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = (e.currentTarget as any).email.value;
    const password = (e.currentTarget as any).password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      window.location.href = "/dashboard";
    }
  }

  return (
    <form onSubmit={handleLogin} className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Login</h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="p-2 rounded bg-slate-800 text-white"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="p-2 rounded bg-slate-800 text-white"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 rounded text-white"
      >
        Entrar
      </button>
    </form>
  );
}
