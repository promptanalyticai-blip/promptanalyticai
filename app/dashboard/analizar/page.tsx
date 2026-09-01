"use client";

import { useState, useEffect, useRef } from "react";
import { plantillas } from "@/components/Plantillas";
import * as echarts from "echarts";

export default function AnalizarPage() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);
  const [archivo, setArchivo] = useState<File | null>(null);

  // AUTOMATIONS
  const [automation, setAutomation] = useState<any>(null);
  const [automationLog, setAutomationLog] = useState<string[]>([]);

  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<any>(null);

  // ---------------------------
  // ANALIZAR TEXTO NORMAL
  // ---------------------------
  async function analizar(contenido: string) {
    setLoading(true);

    const res = await fetch("/api/analizar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: contenido })
    });

    const data = await res.json();
    setResultado(data.resultado || "Sin respuesta");
    setLoading(false);

    ejecutarAutomation("analizar_texto", contenido);
  }

  // ---------------------------
  // A) IMPORTAR PDF
  // ---------------------------
  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setArchivo(e.target.files[0]);
    }
  }

  async function analizarPDF() {
    if (!archivo) {
      alert("Primero selecciona un archivo PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", archivo);

    setLoading(true);

    const res = await fetch("/api/analizar-pdf", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setResultado(data.resultado || "Sin respuesta");
    setLoading(false);

    ejecutarAutomation("analizar_pdf", archivo.name);
  }

  // ---------------------------
  // PLANTILLAS
  // ---------------------------
  function aplicarPlantilla(plantilla: any) {
    if (!texto.trim()) {
      alert("Primero escribe un texto para transformar.");
      return;
    }

    const promptTransformado = plantilla.prompt(texto);
    analizar(promptTransformado);

    ejecutarAutomation("plantilla", plantilla.nombre);
  }

  // ---------------------------
  // B) EXPORTAR PDF
  // ---------------------------
  async function exportarPDF() {
    if (!resultado.trim()) {
      alert("No hay contenido para exportar.");
      return;
    }

    const res = await fetch("/api/exportar-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contenido: resultado })
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte.pdf";
    a.click();

    window.URL.revokeObjectURL(url);

    ejecutarAutomation("exportar_pdf", "reporte.pdf");
  }

  // ---------------------------
  // C) JSON ESTRUCTURADO
  // ---------------------------
  function generarJSON() {
    if (!resultado.trim()) {
      alert("No hay contenido para convertir.");
      return;
    }

    const jsonData = {
      fecha: new Date().toISOString(),
      contenido: resultado,
      longitud: resultado.length,
      palabras: resultado.split(" ").length
    };

    setResultado(JSON.stringify(jsonData, null, 2));

    ejecutarAutomation("generar_json", jsonData);
  }

  function exportarJSON() {
    if (!resultado.trim()) {
      alert("No hay contenido para exportar.");
      return;
    }

    const blob = new Blob([resultado], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resultado.json";
    a.click();

    window.URL.revokeObjectURL(url);

    ejecutarAutomation("exportar_json", "resultado.json");
  }

  // ---------------------------
  // D) GRÁFICOS
  // ---------------------------
  function generarGrafico() {
    if (!resultado.trim()) {
      alert("No hay contenido para graficar.");
      return;
    }

    let palabras = resultado.split(" ").length;
    let caracteres = resultado.length;

    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const option = {
      title: { text: "Análisis del contenido" },
      tooltip: {},
      xAxis: { type: "category", data: ["Palabras", "Caracteres"] },
      yAxis: { type: "value" },
      series: [
        {
          data: [palabras, caracteres],
          type: "bar",
          color: "#4F46E5"
        }
      ]
    };

    chartInstance.current.setOption(option);

    ejecutarAutomation("generar_grafico", { palabras, caracteres });
  }

  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, []);

  // ---------------------------
  // E) AUTOMATIONS
  // ---------------------------
  function crearAutomation() {
    const nueva = {
      nombre: "Automation básica",
      reglas: [
        {
          evento: "analizar_texto",
          accion: "log",
          mensaje: "Se analizó un texto."
        },
        {
          evento: "analizar_pdf",
          accion: "log",
          mensaje: "Se analizó un PDF."
        },
        {
          evento: "exportar_pdf",
          accion: "log",
          mensaje: "Se exportó un PDF."
        }
      ]
    };

    setAutomation(nueva);
    setAutomationLog((prev) => [...prev, "Automation creada"]);
  }

  function ejecutarAutomation(evento: string, data: any) {
    if (!automation) return;

    automation.reglas.forEach((regla: any) => {
      if (regla.evento === evento) {
        if (regla.accion === "log") {
          setAutomationLog((prev) => [
            ...prev,
            `${regla.mensaje} | Data: ${JSON.stringify(data)}`
          ]);
        }
      }
    });
  }

  // ---------------------------
  // UI COMPLETA
  // ---------------------------
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Analizar texto</h1>

      {/* AUTOMATIONS */}
      <button
        onClick={crearAutomation}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 mb-6"
      >
        Crear Automation
      </button>

      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Logs de Automation:</h3>
        {automationLog.map((log, i) => (
          <div key={i} className="text-sm text-gray-700">
            • {log}
          </div>
        ))}
      </div>

      {/* IMPORTAR PDF */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Importar PDF</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={onFileChange}
          className="mb-2"
        />
        <button
          onClick={analizarPDF}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Analizar PDF
        </button>
      </div>

      {/* TEXTAREA */}
      <div className="mb-4">
        <textarea
          className="w-full p-4 rounded-lg bg-white dark:bg-gray-800"
          rows={6}
          placeholder="Escribe aquí el texto a analizar..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </div>

      {/* PLANTILLAS */}
      <h2 className="text-xl font-semibold mb-3">Plantillas rápidas</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {plantillas.map((p) => (
          <button
            key={p.id}
            onClick={() => aplicarPlantilla(p)}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {p.nombre}
          </button>
        ))}
      </div>

      {/* RESULTADO */}
      <h2 className="text-xl font-semibold mb-3">Resultado</h2>

      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        {loading ? "Analizando..." : resultado || "Aquí aparecerá el resultado del análisis."}
      </div>

      {/* EXPORTAR PDF */}
      <button
        onClick={exportarPDF}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mt-4"
      >
        Exportar PDF
      </button>

      {/* JSON */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={generarJSON}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          Generar JSON estructurado
        </button>

        <button
          onClick={exportarJSON}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Exportar JSON
        </button>
      </div>

      {/* GRÁFICO */}
      <div className="mt-10">
        <button
          onClick={generarGrafico}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Generar gráfico
        </button>

        <div
          ref={chartRef}
          style={{ width: "100%", height: "400px", marginTop: "20px" }}
        />
      </div>
    </div>
  );
}
