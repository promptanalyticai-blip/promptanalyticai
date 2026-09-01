"use client";

import { useState } from "react";
import Loader from "@/components/Loader";

export default function CompararPage() {
  const [textoA, setTextoA] = useState("");
  const [textoB, setTextoB] = useState("");
  const [resultadoA, setResultadoA] = useState("");
  const [resultadoB, setResultadoB] = useState("");
  const [cargandoA, setCargandoA] = useState(false);
  const [cargandoB, setCargandoB] = useState(false);

  async function analizar(texto: string, setResultado: any, setCargando: any) {
    if (!texto.trim()) {
      setResultado("Escribe un texto para analizar.");
      return;
    }

    setCargando(true);
    setResultado("");

    try {
      const res = await fetch("/api/analizar/profundo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto }),
      });

      const data = await res.json();
      setResultado(data.resultado || "Sin resultado.");
    } catch {
      setResultado("Error al analizar.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Comparar análisis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bloque A */}
        <div className="p-4 border rounded-lg dark:border-gray-600">
          <h2 className="text-xl font-semibold mb-3">Texto A</h2>

          <textarea
            value={textoA}
            onChange={(e) => setTextoA(e.target.value)}
            className="w-full p-3 border rounded-lg min-h-[120px] dark:bg-gray-700 dark:border-gray-600"
            placeholder="Escribe el primer texto..."
          />

          <button
            onClick={() => analizar(textoA, setResultadoA, setCargandoA)}
            className="mt-3 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 hover-soft"
          >
            Analizar texto A
          </button>

          <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border dark:border-gray-600">
            {cargandoA ? (
              <Loader />
            ) : (
              <pre className="whitespace-pre-wrap">{resultadoA}</pre>
            )}
          </div>
        </div>

        {/* Bloque B */}
        <div className="p-4 border rounded-lg dark:border-gray-600">
          <h2 className="text-xl font-semibold mb-3">Texto B</h2>

          <textarea
            value={textoB}
            onChange={(e) => setTextoB(e.target.value)}
            className="w-full p-3 border rounded-lg min-h-[120px] dark:bg-gray-700 dark:border-gray-600"
            placeholder="Escribe el segundo texto..."
          />

          <button
            onClick={() => analizar(textoB, setResultadoB, setCargandoB)}
            className="mt-3 w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 hover-soft"
          >
            Analizar texto B
          </button>

          <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border dark:border-gray-600">
            {cargandoB ? (
              <Loader />
            ) : (
              <pre className="whitespace-pre-wrap">{resultadoB}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
