"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LogoutPage() {
  async function salir() {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={salir}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover-soft"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
