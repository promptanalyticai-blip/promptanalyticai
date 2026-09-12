"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";

export default function LogoutPage() {
  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    window.location.href = "/auth/login";
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Cerrar sesión</h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white p-2 rounded mt-4"
      >
        Salir
      </button>
    </div>
  );
}
