"use client";

import { supabase } from "../../../lib/supabaseClient";

export default function LogoutPage() {
  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <button
        onClick={logout}
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
