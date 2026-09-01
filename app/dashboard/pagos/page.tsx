"use client";

export default function PagosPage() {
  async function suscribirse() {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Planes y suscripciones</h1>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow max-w-lg">
        <h2 className="text-xl font-semibold mb-3">Plan Pro</h2>
        <p className="mb-4">Acceso ilimitado a análisis, PDF, dashboards y más.</p>

        <button
          onClick={suscribirse}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover-soft"
        >
          Suscribirme
        </button>
      </div>
    </div>
  );
}
