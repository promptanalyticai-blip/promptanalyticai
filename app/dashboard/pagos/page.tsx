"use client";

export default function PagosPage() {
  async function suscribirse() {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Suscripciones</h1>

      <button
        onClick={suscribirse}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Suscribirse
      </button>
    </div>
  );
}
